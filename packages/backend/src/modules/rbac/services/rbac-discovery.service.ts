import { DatabaseService } from "@database/database.service";
import { Injectable, Logger,OnApplicationBootstrap } from "@nestjs/common";
import { DiscoveryService, MetadataScanner, Reflector } from "@nestjs/core";

import { PERMISSIONS_KEY } from "../decorators/permissions.decorator";
import { RBAC_RESOURCE_KEY, RbacResourceOptions } from "../decorators/resource.decorator";

@Injectable()
export class RbacDiscoveryService implements OnApplicationBootstrap {
  private readonly logger = new Logger(RbacDiscoveryService.name);

  constructor(
    private readonly discoveryService: DiscoveryService,
    private readonly metadataScanner: MetadataScanner,
    private readonly reflector: Reflector,
    private readonly db: DatabaseService,
  ) {}

  async onApplicationBootstrap() {
    this.logger.log("Starting RBAC permissions discovery...");
    await this.discoverAndSync();
  }

  private async discoverAndSync() {
    const controllers = this.discoveryService.getControllers();
    const resources: Map<string, { options: RbacResourceOptions; actions: Set<string> }> = new Map();

    for (const wrapper of controllers) {
      const { instance } = wrapper;
      if (!instance) continue;

      const controllerClass = instance.constructor;
      const resourceOptions = this.reflector.get<RbacResourceOptions>(
        RBAC_RESOURCE_KEY,
        controllerClass,
      );

      if (!resourceOptions) continue;

      if (!resources.has(resourceOptions.code)) {
        resources.set(resourceOptions.code, {
          options: resourceOptions,
          actions: new Set(),
        });
      }

      const resourceData = resources.get(resourceOptions.code)!;

      // Ensure all standard actions are always available for UI
      resourceData.actions.add("read");
      resourceData.actions.add("write");
      resourceData.actions.add("create");
      resourceData.actions.add("delete");

      // Scan methods for permissions
      const methods = this.metadataScanner.getAllMethodNames(Object.getPrototypeOf(instance));
      for (const methodName of methods) {
        const permissions = this.reflector.get<string[]>(PERMISSIONS_KEY, instance[methodName]);
        if (permissions) {
          for (const perm of permissions) {
            // perm is e.g. "admin:users:read" or "users:read"
            const parts = perm.split(":");
            if (parts.length >= 2) {
              const action = parts.pop()!;
              resourceData.actions.add(action);
            }
          }
        }
      }
    }

    if (resources.size === 0) {
      this.logger.log("No RBAC resources found.");
      return;
    }

    this.logger.log(`Found ${resources.size} RBAC resources. Cleaning old permissions and syncing...`);

    // Clean up old permissions to ensure only active ones from code/migrations remain
    // Note: We only truncate if we successfully discovered resources to avoid accidental wipe
    await this.db.client.deleteFrom("rbac_permissions").execute();

    for (const [code, data] of resources) {
      const { options, actions } = data;
      const actionsArray = Array.from(actions);

      await this.db.client
        .insertInto("rbac_permissions")
        .values({
          code,
          name: options.name,
          description: options.description || null,
          group_name: options.group,
          app_type: options.appType,
          actions: actionsArray,
          is_system: true,
        })
        .onConflict((oc) =>
          oc.column("code").doUpdateSet({
            name: options.name,
            description: options.description || null,
            group_name: options.group,
            app_type: options.appType,
            actions: actionsArray,
          }),
        )
        .execute();
      
      this.logger.debug(`Synced resource: ${code} (${actionsArray.join(", ")})`);
    }

    this.logger.log("RBAC permissions sync complete.");
  }
}

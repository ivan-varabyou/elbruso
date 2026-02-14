import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  SetMetadata,
  UnauthorizedException,
} from "@nestjs/common";
import { Reflector } from "@nestjs/core";

import { AdminRole } from "../../admin/enums/admin-role.enum";
import { RbacService } from "../services/rbac.service";

export const PERMISSIONS_KEY = "permissions";

export const Permissions = (...permissions: string[]) => SetMetadata(PERMISSIONS_KEY, permissions);

@Injectable()
export class RbacGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private rbacService: RbacService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredPermissions = this.reflector.getAllAndOverride<string[]>(PERMISSIONS_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    // No permissions required - allow access
    if (!requiredPermissions || requiredPermissions.length === 0) {
      return true;
    }

    // Extract user from request
    const request = context.switchToHttp().getRequest();
    const user = request.user as
      | { id?: string; sub?: string; role?: string; appType?: string; organizationId?: number }
      | undefined;

    // Support both admin JWT (sub, role) and regular JWT (id)
    const userId = user?.id || user?.sub;
    const roleCode = user?.role;

    if (!userId) {
      throw new UnauthorizedException("User not authenticated");
    }

    // Determine appType from role or JWT payload
    const appType =
      user?.appType ||
      (roleCode === AdminRole.SUPER_ADMIN ||
      roleCode === AdminRole.ADMIN ||
      roleCode === AdminRole.MODERATOR
        ? "admin"
        : "webapp");

    const result = await this.rbacService.canAccess(
      userId,
      requiredPermissions,
      roleCode,
      appType,
      {
        organizationId: request.body?.organizationId || user?.organizationId,
        resourceId: request.params?.id,
      },
    );

    if (!result.allowed) {
      throw new ForbiddenException(result.reason || "Access denied");
    }

    return true;
  }
}

import { SetMetadata } from "@nestjs/common";

export const RBAC_RESOURCE_KEY = "rbac:resource";

export interface RbacResourceOptions {
  code: string;
  name: string;
  description?: string;
  group: string;
  appType: "admin" | "webapp" | "both";
}

export const RbacResource = (options: RbacResourceOptions) => SetMetadata(RBAC_RESOURCE_KEY, options);

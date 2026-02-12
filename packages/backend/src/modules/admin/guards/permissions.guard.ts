import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { AdminRole } from "../enums/admin-role.enum";

export const PERMISSIONS_KEY = "permissions";
export const Permissions =
  (...permissions: string[]) =>
  (target: object, key?: string | symbol, descriptor?: PropertyDescriptor) => {
    Reflect.defineMetadata(PERMISSIONS_KEY, permissions, descriptor?.value ?? target);
    return descriptor ?? target;
  };

@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredPermissions = this.reflector.getAllAndOverride<string[]>(PERMISSIONS_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredPermissions || requiredPermissions.length === 0) {
      return true;
    }

    const { user } = context.switchToHttp().getRequest();

    if (!user?.role) {
      throw new ForbiddenException("Access denied");
    }

    const hasPermission = requiredPermissions.some((permission) => {
      switch (user.role) {
        case AdminRole.SUPER_ADMIN:
          return true;
        case AdminRole.ADMIN:
          return !permission.endsWith(":delete");
        case AdminRole.MODERATOR:
          return permission.startsWith("users:read");
        default:
          return false;
      }
    });

    if (!hasPermission) {
      throw new ForbiddenException("Insufficient permissions");
    }

    return true;
  }
}

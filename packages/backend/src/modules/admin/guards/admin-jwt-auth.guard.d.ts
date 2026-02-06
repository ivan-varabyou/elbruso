import { ExecutionContext } from '@nestjs/common';
declare const AdminJwtAuthGuard_base: import("@nestjs/passport").Type<import("@nestjs/passport").IAuthGuard>;
export declare class AdminJwtAuthGuard extends AdminJwtAuthGuard_base {
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | import("node_modules/rxjs/dist/types").Observable<boolean>;
}
export {};

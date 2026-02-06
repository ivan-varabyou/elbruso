import { DatabaseService } from '@database/database.service';
export declare enum AuditAction {
    LOGIN = "LOGIN",
    LOGOUT = "LOGOUT",
    REGISTER = "REGISTER",
    TOKEN_REFRESH = "TOKEN_REFRESH",
    WORKSPACE_CREATE = "WORKSPACE_CREATE",
    WORKSPACE_UPDATE = "WORKSPACE_UPDATE",
    WORKSPACE_DELETE = "WORKSPACE_DELETE",
    MEMBER_ADD = "MEMBER_ADD",
    MEMBER_REMOVE = "MEMBER_REMOVE",
    MEMBER_ROLE_UPDATE = "MEMBER_ROLE_UPDATE",
    PAGE_CREATE = "PAGE_CREATE",
    PAGE_UPDATE = "PAGE_UPDATE",
    PAGE_DELETE = "PAGE_DELETE",
    PAGE_MOVE = "PAGE_MOVE",
    BLOCK_CREATE = "BLOCK_CREATE",
    BLOCK_UPDATE = "BLOCK_UPDATE",
    BLOCK_DELETE = "BLOCK_DELETE",
    BLOCK_MOVE = "BLOCK_MOVE",
    TABLE_CREATE = "TABLE_CREATE",
    TABLE_UPDATE = "TABLE_UPDATE",
    TABLE_DELETE = "TABLE_DELETE",
    VERSION_CREATE = "VERSION_CREATE",
    VERSION_ACTIVATE = "VERSION_ACTIVATE",
    CELLS_UPDATE = "CELLS_UPDATE",
    FORMULA_CALCULATE = "FORMULA_CALCULATE"
}
export declare class AuditService {
    private readonly db;
    constructor(db: DatabaseService);
    log(params: {
        userId?: string;
        action: AuditAction | string;
        entityType: string;
        entityId?: string;
        details?: any;
        ipAddress?: string;
        userAgent?: string;
    }): Promise<void>;
}

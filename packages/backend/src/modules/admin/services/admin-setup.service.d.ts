import { DatabaseService } from '@database/database.service';
export declare class AdminSetupService {
    private readonly db;
    constructor(db: DatabaseService);
    countAdmins(): Promise<number>;
    createFirstAdmin(data: {
        email: string;
        password: string;
        name: string;
    }): Promise<{
        email: string;
        name: string;
        role: string;
        created_at: Date;
        id: string;
        is_active: boolean;
        updated_at: Date;
        password_hash: string;
        last_login_at: Date;
        role_id: string;
    }>;
    resetAdminPassword(email: string, newPassword: string): Promise<"success" | "not_found">;
}

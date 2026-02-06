import { AdminSetupDto } from '../dto/admin-setup.dto';
import { AdminResetDto } from '../dto/admin-reset.dto';
import { AdminSetupService } from '../services/admin-setup.service';
export declare class AdminSetupController {
    private readonly adminSetupService;
    constructor(adminSetupService: AdminSetupService);
    setup(dto: AdminSetupDto): Promise<{
        message: string;
        admin: {
            id: any;
            email: any;
            name: any;
            role: any;
        };
    }>;
    resetAdmin(dto: AdminResetDto): Promise<{
        message: string;
        updated: string;
    }>;
}

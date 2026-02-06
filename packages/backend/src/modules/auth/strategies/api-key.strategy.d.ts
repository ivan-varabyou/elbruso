import { Request } from 'express';
import { Strategy } from 'passport-custom';
import { AuthService } from '../services/auth.service';
declare const ApiKeyStrategy_base: new (...args: any[]) => Strategy;
export declare class ApiKeyStrategy extends ApiKeyStrategy_base {
    private readonly authService;
    constructor(authService: AuthService);
    validate(req: Request): Promise<{
        id: string;
        email: string;
    }>;
}
export {};

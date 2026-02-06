import { ConfigService } from '@nestjs/config';
import { Strategy } from 'passport-jwt';
export interface AdminJwtPayload {
    sub: string;
    email: string;
    role: string;
}
declare const AdminJwtStrategy_base: new (...args: any[]) => Strategy;
export declare class AdminJwtStrategy extends AdminJwtStrategy_base {
    private readonly configService;
    constructor(configService: ConfigService);
    validate(payload: AdminJwtPayload): Promise<AdminJwtPayload>;
}
export {};

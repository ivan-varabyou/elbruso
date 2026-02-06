import { ConfigService } from '@nestjs/config';
import { Strategy } from 'passport-jwt';
import { JwtPayload } from '../interfaces';
declare const JwtStrategy_base: new (...args: any[]) => Strategy;
export declare class JwtStrategy extends JwtStrategy_base {
    private readonly _configService;
    constructor(_configService: ConfigService);
    validate(payload: JwtPayload): Promise<JwtPayload>;
}
export {};

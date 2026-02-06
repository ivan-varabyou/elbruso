import { ConfigService } from '@nestjs/config';
import { EmailProvider } from '../interfaces/email-provider.interface';
export declare class SmtpEmailProvider implements EmailProvider {
    private readonly configService;
    private readonly logger;
    private transporter;
    constructor(configService: ConfigService);
    send(to: string, subject: string, html: string): Promise<void>;
}

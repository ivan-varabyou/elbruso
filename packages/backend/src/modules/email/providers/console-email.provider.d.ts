import { EmailProvider } from '../interfaces/email-provider.interface';
export declare class ConsoleEmailProvider implements EmailProvider {
    private readonly logger;
    send(to: string, subject: string, html: string): Promise<void>;
}

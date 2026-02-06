import { ConfigService } from '@nestjs/config';
import { DatabaseService } from '@database/database.service';
import { ConsoleEmailProvider } from '../providers/console-email.provider';
import { SmtpEmailProvider } from '../providers/smtp-email.provider';
interface User {
    id: string;
    email: string;
    name: string;
}
export declare class EmailService {
    private readonly db;
    private readonly configService;
    private readonly consoleProvider;
    private readonly smtpProvider;
    private provider;
    constructor(db: DatabaseService, configService: ConfigService, consoleProvider: ConsoleEmailProvider, smtpProvider: SmtpEmailProvider);
    sendWelcome(user: User, lang?: string): Promise<void>;
    sendPasswordReset(user: User, token: string, lang?: string): Promise<void>;
    sendPasswordChanged(user: User, lang?: string): Promise<void>;
    private getTemplate;
    private replaceVariables;
}
export {};

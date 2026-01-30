import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DatabaseService } from '../../../database/database.service';
import { EmailProvider } from '../interfaces/email-provider.interface';
import { ConsoleEmailProvider } from '../providers/console-email.provider';
import { SmtpEmailProvider } from '../providers/smtp-email.provider';

interface User {
  id: string;
  email: string;
  name: string;
}

@Injectable()
export class EmailService {
  private provider: EmailProvider;

  constructor(
    private readonly db: DatabaseService,
    private readonly configService: ConfigService,
    private readonly consoleProvider: ConsoleEmailProvider,
    private readonly smtpProvider: SmtpEmailProvider,
  ) {
    const providerType = this.configService.get<string>(
      'EMAIL_PROVIDER',
      'console',
    );
    this.provider =
      providerType === 'smtp' ? this.smtpProvider : this.consoleProvider;
  }

  async sendWelcome(user: User, lang: string = 'ru'): Promise<void> {
    const template = await this.getTemplate('welcome', lang);
    if (!template) return;

    const html = this.replaceVariables(template.body, { name: user.name });
    await this.provider.send(user.email, template.subject, html);
  }

  async sendPasswordReset(
    user: User,
    token: string,
    lang: string = 'ru',
  ): Promise<void> {
    const template = await this.getTemplate('password_reset', lang);
    if (!template) return;

    const resetLink = `${this.configService.get<string>('FRONTEND_URL', 'http://localhost:7200')}/reset-password?token=${token}`;
    const html = this.replaceVariables(template.body, { link: resetLink });
    await this.provider.send(user.email, template.subject, html);
  }

  async sendPasswordChanged(user: User, lang: string = 'ru'): Promise<void> {
    const template = await this.getTemplate('password_changed', lang);
    if (!template) return;

    const html = this.replaceVariables(template.body, { name: user.name });
    await this.provider.send(user.email, template.subject, html);
  }

  private async getTemplate(
    key: string,
    lang: string,
  ): Promise<{ subject: string; body: string } | null> {
    const template = await this.db.client
      .selectFrom('email_templates')
      .selectAll()
      .where('key', '=', key)
      .where('is_active', '=', true)
      .executeTakeFirst();

    if (!template) return null;

    return {
      subject: lang === 'en' ? template.subject_en : template.subject_ru,
      body: lang === 'en' ? template.body_en : template.body_ru,
    };
  }

  private replaceVariables(
    template: string,
    variables: Record<string, string>,
  ): string {
    let result = template;
    for (const [key, value] of Object.entries(variables)) {
      result = result.replace(new RegExp(`{{${key}}}`, 'g'), value);
    }
    return result;
  }
}

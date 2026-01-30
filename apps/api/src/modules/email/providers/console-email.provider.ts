import { Injectable, Logger } from '@nestjs/common';
import { EmailProvider } from '../interfaces/email-provider.interface';

@Injectable()
export class ConsoleEmailProvider implements EmailProvider {
  private readonly logger = new Logger(ConsoleEmailProvider.name);

  async send(to: string, subject: string, html: string): Promise<void> {
    this.logger.log('='.repeat(80));
    this.logger.log('📧 EMAIL SENT (Console Provider)');
    this.logger.log('='.repeat(80));
    this.logger.log(`To: ${to}`);
    this.logger.log(`Subject: ${subject}`);
    this.logger.log('-'.repeat(80));
    this.logger.log(html);
    this.logger.log('='.repeat(80));
  }
}

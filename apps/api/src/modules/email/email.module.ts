import { Module } from '@nestjs/common';
import { EmailService } from './services/email.service';
import { ConsoleEmailProvider } from './providers/console-email.provider';
import { SmtpEmailProvider } from './providers/smtp-email.provider';
import { DatabaseModule } from '../../database/database.module';

@Module({
  imports: [DatabaseModule],
  providers: [EmailService, ConsoleEmailProvider, SmtpEmailProvider],
  exports: [EmailService],
})
export class EmailModule {}

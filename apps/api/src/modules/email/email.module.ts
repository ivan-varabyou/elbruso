import { Module } from '@nestjs/common';
import { DatabaseModule } from '@database/database.module';
import { ConsoleEmailProvider } from './providers/console-email.provider';
import { SmtpEmailProvider } from './providers/smtp-email.provider';
import { EmailService } from './services/email.service';

@Module({
  imports: [DatabaseModule],
  providers: [EmailService, ConsoleEmailProvider, SmtpEmailProvider],
  exports: [EmailService],
})
export class EmailModule {}

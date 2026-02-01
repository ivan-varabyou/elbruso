import { Module, Global } from '@nestjs/common';
import { DatabaseModule } from '@database/database.module';
import { AuditService } from './services/audit.service';

@Global()
@Module({
  imports: [DatabaseModule],
  providers: [AuditService],
  exports: [AuditService],
})
export class AuditModule {}

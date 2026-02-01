import { Module } from '@nestjs/common';
import { DatabaseModule } from '@database/database.module';
import { AuditModule } from '../audit/audit.module';
import { WorkspaceModule } from '../workspace/workspace.module';
import { PagesController } from './controllers/pages.controller';
import { PagesService } from './services/pages.service';

@Module({
  imports: [DatabaseModule, WorkspaceModule, AuditModule],
  controllers: [PagesController],
  providers: [PagesService],
  exports: [PagesService],
})
export class PagesModule {}

import { Module } from '@nestjs/common';
import { PagesService } from './services/pages.service';
import { PagesController } from './controllers/pages.controller';
import { DatabaseModule } from '@database/database.module';
import { WorkspaceModule } from '../workspace/workspace.module';
import { AuditModule } from '../audit/audit.module';

@Module({
  imports: [DatabaseModule, WorkspaceModule, AuditModule],
  controllers: [PagesController],
  providers: [PagesService],
  exports: [PagesService],
})
export class PagesModule {}

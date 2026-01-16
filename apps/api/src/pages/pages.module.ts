import { Module } from '@nestjs/common';
import { PagesService } from './pages.service';
import { PagesController } from './pages.controller';
import { DatabaseModule } from '../database/database.module';
import { WorkspacesModule } from '../workspaces/workspaces.module';
import { AuditModule } from '../common/audit/audit.module';

@Module({
  imports: [DatabaseModule, WorkspacesModule, AuditModule],
  controllers: [PagesController],
  providers: [PagesService],
  exports: [PagesService],
})
export class PagesModule {}

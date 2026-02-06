import { Module } from '@nestjs/common';
import { AuditModule } from '@backend/modules/audit';
import { UsersModule } from '@backend/modules/users';
import { DatabaseModule } from '@database/database.module';
import { WorkspaceGroupController } from './controllers/workspace-group.controller';
import { WorkspaceController } from './controllers/workspace.controller';
import { WorkspaceGroupService } from './services/workspace-group.service';
import { WorkspaceService } from './services/workspace.service';

@Module({
  imports: [DatabaseModule, UsersModule, AuditModule],
  controllers: [WorkspaceController, WorkspaceGroupController],
  providers: [WorkspaceService, WorkspaceGroupService],
  exports: [WorkspaceService, WorkspaceGroupService],
})
export class WorkspaceModule {}

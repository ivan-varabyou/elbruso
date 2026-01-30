import { Module, forwardRef } from '@nestjs/common';
import { DatabaseModule } from '../../database/database.module';
import { WorkspaceController } from './controllers/workspace.controller';
import { WorkspaceService } from './services/workspace.service';
import { WorkspaceGroupController } from './controllers/workspace-group.controller';
import { WorkspaceGroupService } from './services/workspace-group.service';
import { UsersModule } from '../users/users.module';
import { AuditModule } from '../audit/audit.module';

@Module({
  imports: [DatabaseModule, UsersModule, AuditModule],
  controllers: [WorkspaceController, WorkspaceGroupController],
  providers: [WorkspaceService, WorkspaceGroupService],
  exports: [WorkspaceService, WorkspaceGroupService],
})
export class WorkspaceModule {}

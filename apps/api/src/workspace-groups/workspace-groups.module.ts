import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { WorkspacesModule } from '../workspaces/workspaces.module';
import { WorkspaceGroupsService } from './workspace-groups.service';
import { WorkspaceGroupsController } from './workspace-groups.controller';

@Module({
  imports: [DatabaseModule, WorkspacesModule],
  controllers: [WorkspaceGroupsController],
  providers: [WorkspaceGroupsService],
  exports: [WorkspaceGroupsService],
})
export class WorkspaceGroupsModule {}

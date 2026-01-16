import { Module } from '@nestjs/common';
import { BlocksService } from './blocks.service';
import { BlocksController } from './blocks.controller';
import { DatabaseModule } from '../database/database.module';
import { PagesModule } from '../pages/pages.module';
import { AuditModule } from '../common/audit/audit.module';

@Module({
  imports: [DatabaseModule, PagesModule, AuditModule],
  controllers: [BlocksController],
  providers: [BlocksService],
  exports: [BlocksService],
})
export class BlocksModule {}

import { Module } from '@nestjs/common';
import { BlocksService } from './services/blocks.service';
import { BlocksController } from './controllers/blocks.controller';
import { DatabaseModule } from '@database/database.module';
import { PagesModule } from '../pages/pages.module';
import { AuditModule } from '../audit/audit.module';

@Module({
  imports: [DatabaseModule, PagesModule, AuditModule],
  controllers: [BlocksController],
  providers: [BlocksService],
  exports: [BlocksService],
})
export class BlocksModule {}

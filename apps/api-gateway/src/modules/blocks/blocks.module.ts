import { Module } from '@nestjs/common';
import { DatabaseModule } from '@database/database.module';
import { AuditModule } from '../audit/audit.module';
import { PagesModule } from '../pages/pages.module';
import { BlocksController } from './controllers/blocks.controller';
import { BlocksService } from './services/blocks.service';

@Module({
  imports: [DatabaseModule, PagesModule, AuditModule],
  controllers: [BlocksController],
  providers: [BlocksService],
  exports: [BlocksService],
})
export class BlocksModule {}

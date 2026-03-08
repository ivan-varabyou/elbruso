import { Module } from '@nestjs/common';
import { SpreadsheetController } from './controllers/spreadsheet.controller';
import { SpreadsheetService } from './services/spreadsheet.service';
import { DatabaseModule } from '@database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [SpreadsheetController],
  providers: [SpreadsheetService],
  exports: [SpreadsheetService],
})
export class SpreadsheetModule {}

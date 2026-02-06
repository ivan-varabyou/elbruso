import { Module } from '@nestjs/common';
import { DatabaseModule } from '@database/database.module';
import { SportsController } from './controllers/sports.controller';
import { SportsService } from './services/sports.service';

@Module({
  imports: [DatabaseModule],
  controllers: [SportsController],
  providers: [SportsService],
  exports: [SportsService],
})
export class SportsModule {}

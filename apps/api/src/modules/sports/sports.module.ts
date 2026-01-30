import { Module } from '@nestjs/common';
import { SportsController } from './controllers/sports.controller';
import { SportsService } from './services/sports.service';
import { DatabaseModule } from '../../database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [SportsController],
  providers: [SportsService],
  exports: [SportsService],
})
export class SportsModule {}

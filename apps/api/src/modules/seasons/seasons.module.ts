import { Module } from '@nestjs/common';
import { SeasonsController } from './controllers/seasons.controller';
import { SeasonsService } from './services/seasons.service';
import { DatabaseModule } from '@database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [SeasonsController],
  providers: [SeasonsService],
  exports: [SeasonsService],
})
export class SeasonsModule {}

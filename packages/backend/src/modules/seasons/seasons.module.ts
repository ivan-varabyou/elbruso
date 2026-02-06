import { Module } from '@nestjs/common';
import { DatabaseModule } from '@database/database.module';
import { SeasonsController } from './controllers/seasons.controller';
import { SeasonsService } from './services/seasons.service';

@Module({
  imports: [DatabaseModule],
  controllers: [SeasonsController],
  providers: [SeasonsService],
  exports: [SeasonsService],
})
export class SeasonsModule {}

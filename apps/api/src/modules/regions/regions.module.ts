import { Module } from '@nestjs/common';
import { RegionsController } from './controllers/regions.controller';
import { RegionsService } from './services/regions.service';
import { DatabaseModule } from '@database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [RegionsController],
  providers: [RegionsService],
  exports: [RegionsService],
})
export class RegionsModule {}

import { Module } from '@nestjs/common';
import { DatabaseModule } from '@database/database.module';
import { RegionsController } from './controllers/regions.controller';
import { RegionsService } from './services/regions.service';

@Module({
  imports: [DatabaseModule],
  controllers: [RegionsController],
  providers: [RegionsService],
  exports: [RegionsService],
})
export class RegionsModule {}

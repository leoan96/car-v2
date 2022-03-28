import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CarFeatures } from '../car-entity/car-features.entity';
import { CarFeaturesController } from './car-features.controller';
import { CarFeaturesService } from './car-features.service';

@Module({
  imports: [TypeOrmModule.forFeature([CarFeatures])],
  providers: [CarFeaturesService],
  controllers: [CarFeaturesController],
})
export class CarFeaturesModule {}

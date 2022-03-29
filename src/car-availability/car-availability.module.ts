import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CarAvailability } from '../car-entity/car-availability.entity';
import { CarListing } from '../car-entity/car-listing.entity';
import { CarAvailabilityController } from './car-availability.controller';
import { CarAvailabilityService } from './car-availability.service';

@Module({
  imports: [TypeOrmModule.forFeature([CarListing, CarAvailability])],
  providers: [CarAvailabilityService],
  controllers: [CarAvailabilityController],
})
export class CarAvailabilityModule {}

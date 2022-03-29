import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CarAvailability } from '../car-entity/car-availability.entity';
import { CarFeatures } from '../car-entity/car-features.entity';
import { CarListing } from '../car-entity/car-listing.entity';
// import { CarTimeSlot } from '../car-entity/car-time-slot.entity';
import { Car } from '../car-entity/car.entity';
import { CarListingController } from './car-listing.controller';
import { CarListingService } from './car-listing.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Car,
      CarAvailability,
      CarFeatures,
      CarListing,
      // CarTimeSlot,
    ]),
  ],
  providers: [CarListingService],
  controllers: [CarListingController],
})
export class CarListingModule {}

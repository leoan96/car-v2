import { Module } from '@nestjs/common';
import { CarListingService } from './car-listing.service';
import { CarListingController } from './car-listing.controller';

@Module({
  providers: [CarListingService],
  controllers: [CarListingController],
})
export class CarListingModule {}

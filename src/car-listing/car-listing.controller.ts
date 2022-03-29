import { Body, Controller, Get, Post } from '@nestjs/common';

import { CreateCarListingDto } from './car-listing.dto';
import { CarListing } from '../car-entity/car-listing.entity';
import { CarListingService } from './car-listing.service';

@Controller('car-listing')
export class CarListingController {
  constructor(private readonly carListingService: CarListingService) {}

  @Post()
  public addCarListing(
    @Body() createCarListingDto: CreateCarListingDto,
  ): Promise<CarListing> {
    return this.carListingService.addCarListing(createCarListingDto);
  }

  @Get()
  public getAllCarListings() {
    return this.carListingService.getAllCarListings();
  }
}

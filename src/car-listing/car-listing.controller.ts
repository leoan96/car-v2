import { Body, Controller, Post } from '@nestjs/common';
import { CreateCarListingDto } from './car-listing.dto';
import { CarListingService } from './car-listing.service';

@Controller('car-listing')
export class CarListingController {
  constructor(private readonly carListingService: CarListingService) {}

  @Post()
  public async addCarListing(@Body() createCarListingDto: CreateCarListingDto) {
    await this.carListingService.addCarListing(createCarListingDto);
  }
}

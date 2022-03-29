import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';

import { CreateCarListingDto } from './car-listing.dto';
import { CarListing } from '../car-entity/car-listing.entity';
import { CarListingService } from './car-listing.service';

@Controller('car-listing')
export class CarListingController {
  constructor(private readonly carListingService: CarListingService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  public addCarListing(
    @Body() createCarListingDto: CreateCarListingDto,
  ): Promise<CarListing> {
    return this.carListingService.addCarListing(createCarListingDto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  public getAllCarListings(): Promise<CarListing[]> {
    return this.carListingService.getAllCarListings();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  public getCarListingsById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<CarListing> {
    return this.carListingService.getCarListingsById(id);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  public deleteCarListing(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<void> {
    return this.carListingService.deleteCarListing(id);
  }
}

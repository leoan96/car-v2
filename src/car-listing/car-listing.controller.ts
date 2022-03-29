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
  UseGuards,
} from '@nestjs/common';

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreateCarListingDto } from './car-listing.dto';
import { CarListing } from '../car-entity/car-listing.entity';
import { CarListingService } from './car-listing.service';

@Controller('car-listing')
export class CarListingController {
  constructor(private readonly carListingService: CarListingService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.CREATED)
  public addCarListing(
    @Body() createCarListingDto: CreateCarListingDto,
  ): Promise<CarListing> {
    return this.carListingService.addCarListing(createCarListingDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  public getAllCarListings(): Promise<CarListing[]> {
    return this.carListingService.getAllCarListings();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  public getCarListingsById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<CarListing> {
    return this.carListingService.getCarListingsById(id);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  public deleteCarListing(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<void> {
    return this.carListingService.deleteCarListing(id);
  }
}

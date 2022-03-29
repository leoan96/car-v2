import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CarAvailability } from '../car-entity/car-availability.entity';
import {
  CreateCarAvailabilityDto,
  UpdateCarAvailabilityDto,
} from './car-availability.dto';
import { CarAvailabilityService } from './car-availability.service';

@Controller('car-availability')
export class CarAvailabilityController {
  constructor(
    private readonly carAvailabilityService: CarAvailabilityService,
  ) {}

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  public getCurrentTimings(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<CarAvailability[]> {
    return this.carAvailabilityService.getCurrentTimings(id);
  }

  @Post(':id')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.CREATED)
  public addAvailabilityTime(
    @Param('id', ParseIntPipe) id: number,
    @Body() createCarAvailabilityDto: CreateCarAvailabilityDto,
  ): Promise<CarAvailability> {
    return this.carAvailabilityService.addAvailabilityTime(
      id,
      createCarAvailabilityDto,
    );
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  public updateAvailabilityTime(
    @Param('id', ParseIntPipe) id: number,
    @Body()
    updateCarAvailabilityDto: UpdateCarAvailabilityDto,
  ): Promise<CarAvailability> {
    return this.carAvailabilityService.updateAvailabilityTime(
      id,
      updateCarAvailabilityDto,
    );
  }
}

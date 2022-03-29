import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
} from '@nestjs/common';

import { CarFeatures } from '../car-entity/car-features.entity';
import { CreateCarFeaturesDto, UpdateCarFeaturesDto } from './car-features.dto';
import { CarFeaturesService } from './car-features.service';

@Controller('car-features')
export class CarFeaturesController {
  constructor(private readonly carFeaturesService: CarFeaturesService) {}

  @Post('')
  @HttpCode(HttpStatus.CREATED)
  public addNewFeature(
    @Body() createCarFeaturesDto: CreateCarFeaturesDto,
  ): Promise<CarFeatures> {
    return this.carFeaturesService.addNewFeature(createCarFeaturesDto.feature);
  }

  @Get('')
  @HttpCode(HttpStatus.OK)
  public getAllFeatures(): Promise<CarFeatures[]> {
    return this.carFeaturesService.getAllFeatures();
  }

  @Get(':featureName')
  @HttpCode(HttpStatus.OK)
  public getFeatureByName(
    @Param('featureName') featureName: string,
  ): Promise<CarFeatures> {
    return this.carFeaturesService.getFeatureByName(featureName);
  }

  @Patch(':featureName')
  @HttpCode(HttpStatus.OK)
  public updateFeatureByName(
    @Body() updateCarFeaturesDto: UpdateCarFeaturesDto,
  ): Promise<CarFeatures> {
    return this.carFeaturesService.updateFeatureByName(
      updateCarFeaturesDto.oldFeature,
      updateCarFeaturesDto.newFeature,
    );
  }

  @Delete(':featureName')
  @HttpCode(HttpStatus.NO_CONTENT)
  public deleteFeature(
    @Param('featureName') featureName: string,
  ): Promise<void> {
    return this.carFeaturesService.deleteFeature(featureName);
  }
}

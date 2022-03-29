import { CarFeatures, CAR_FEATURES } from './car-features.types';

import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
export class CreateCarFeaturesDto {
  @IsNotEmpty()
  @IsEnum(CAR_FEATURES)
  @IsString()
  feature: CarFeatures;
}

export class UpdateCarFeaturesDto {
  @IsNotEmpty()
  @IsString()
  oldFeature: string;

  @IsNotEmpty()
  @IsString()
  newFeature: string;
}

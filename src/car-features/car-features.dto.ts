import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCarFeaturesDto {
  @IsNotEmpty()
  @IsString()
  feature: string;
}

export class UpdateCarFeaturesDto {
  @IsNotEmpty()
  @IsString()
  oldFeature: string;

  @IsNotEmpty()
  @IsString()
  newFeature: string;
}

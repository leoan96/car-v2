import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCarFeaturesDto {
  @IsNotEmpty()
  @IsString()
  feature: string;
}

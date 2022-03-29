import { IsNotEmpty, IsDateString, IsOptional } from 'class-validator';

export class CreateCarAvailabilityDto {
  @IsNotEmpty()
  @IsDateString()
  startDate: string;

  @IsNotEmpty()
  @IsDateString()
  endDate: string;

  //   @IsNotEmpty()
  //   @IsArray()
  //   @IsNumber({}, { each: true })
  //   carAvailabilityTimeSlot: number[];
}

export class UpdateCarAvailabilityDto {
  @IsOptional()
  @IsDateString()
  startDate: string;

  @IsOptional()
  @IsDateString()
  endDate: string;
}

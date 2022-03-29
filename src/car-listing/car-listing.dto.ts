import { CarBrands, CAR_BRANDS } from './car-listing.type';
import { CarFeatures, CAR_FEATURES } from '../car-features/car-features.types';

import { Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

export class CarDetails {
  @IsNotEmpty()
  @IsEnum(CAR_BRANDS)
  brand: CarBrands;

  @IsNotEmpty()
  @IsString()
  model: string;

  @IsNotEmpty()
  @IsEnum(CAR_FEATURES, { each: true })
  @IsArray()
  carFeatures: CarFeatures[];

  @IsNotEmpty({ each: true })
  @IsArray()
  @IsString({ each: true })
  description: string[];

  @IsNotEmpty({ each: true })
  @IsArray()
  @IsString({ each: true })
  images: string[];
}

export class CarAvailability {
  @IsNotEmpty()
  @IsDateString()
  startDate: string;

  @IsNotEmpty()
  @IsDateString()
  endDate: string;

  @IsNotEmpty()
  @IsArray()
  @IsNumber({}, { each: true })
  carAvailabilityTimeSlot: number[];
}

export class CreateCarListingDto {
  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => CarDetails)
  car: CarDetails;

  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => CarAvailability)
  carAvailability: CarAvailability;

  @IsNotEmpty()
  @IsString()
  pickupLocation: string;

  @IsNotEmpty()
  @IsNumber()
  lat: number;

  @IsNotEmpty()
  @IsNumber()
  lng: number;

  @IsNotEmpty()
  @IsNumber()
  pricePerHour: number;

  @IsNotEmpty()
  @IsBoolean()
  isAvailableForViewInCarListing: boolean;
}

export class UpdateCarListingDto {
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => CarDetails)
  car: CarDetails;

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => CarAvailability)
  carAvailbility: CarAvailability;

  @IsOptional()
  @IsString()
  pickupLocation: string;

  @IsOptional()
  @IsNumber()
  lat: number;

  @IsOptional()
  @IsNumber()
  lng: number;

  @IsOptional()
  @IsNumber()
  pricePerHour: number;

  @IsOptional()
  @IsBoolean()
  isAvailableForViewInCarListing: boolean;
}

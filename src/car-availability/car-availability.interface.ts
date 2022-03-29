import { CarAvailability } from '../car-entity/car-availability.entity';
import {
  CreateCarAvailabilityDto,
  UpdateCarAvailabilityDto,
} from './car-availability.dto';

export interface CarAvailabilityInterface {
  getCurrentTimings(carListingId: number): Promise<CarAvailability[]>;
  addAvailabilityTime(
    carListingId: number,
    createCarAvailabilityDto: CreateCarAvailabilityDto,
  ): Promise<CarAvailability>;
  updateAvailabilityTime(
    carAvailabilityId: number,
    updateCarAvailabilityDto: UpdateCarAvailabilityDto,
  ): Promise<CarAvailability>;
}

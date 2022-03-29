import { BadRequestException, Injectable } from '@nestjs/common';

import { CarAvailability } from '../car-entity/car-availability.entity';
import { CarAvailabilityInterface } from './car-availability.interface';
import {
  CreateCarAvailabilityDto,
  UpdateCarAvailabilityDto,
} from './car-availability.dto';
import { InjectRepository } from '@nestjs/typeorm';

import { CarListing } from '../car-entity/car-listing.entity';
import { handleAsyncError } from '../../utilities/error-handler';

import { Connection, EntityNotFoundError, Repository } from 'typeorm';

@Injectable()
export class CarAvailabilityService implements CarAvailabilityInterface {
  constructor(
    private readonly connection: Connection,
    @InjectRepository(CarListing)
    private readonly carListingRepository: Repository<CarListing>,
    @InjectRepository(CarAvailability)
    private readonly carAvailabilityRepository: Repository<CarAvailability>,
  ) {}

  public async getCurrentTimings(
    carListingId: number,
  ): Promise<CarAvailability[]> {
    const [carListing, carListingError]: [CarListing[], unknown] =
      await handleAsyncError(
        this.carListingRepository
          .createQueryBuilder('listing')
          .leftJoinAndSelect('listing.car_availability', 'car_availability')
          .where('listing.id = :id', { id: carListingId })
          .select(['listing.id', 'car_availability'])
          .getMany(),
      );
    if (carListingError) {
      if (carListingError instanceof EntityNotFoundError) {
        throw new BadRequestException(
          `Could not find any entity with id=${carListingId}`,
        );
      }
    }

    const result = carListing[0]?.car_availability;
    if (!result) {
      throw new BadRequestException('Car availability does not exist');
    }
    return result;
  }

  public async addAvailabilityTime(
    carListingId: number,
    createCarAvailabilityDto: CreateCarAvailabilityDto,
  ): Promise<CarAvailability> {
    let car_availability;
    // #TODO: should implement logic to check incoming createCarAvailabilityDto's (startDate, endDate)
    // clashes with the existing availability time
    await this.connection.manager.transaction(async (manager) => {
      const [carListing, carListingError]: [CarListing, unknown] =
        await handleAsyncError(
          manager
            .getRepository(CarListing)
            .createQueryBuilder('listing')
            .leftJoinAndSelect('listing.car', 'car')
            .leftJoinAndSelect('listing.car_availability', 'car_availability')
            .where('listing.id = :id', { id: carListingId })
            .getOneOrFail(),
        );
      if (carListingError) {
        if (carListingError instanceof EntityNotFoundError) {
          throw new BadRequestException(
            `Could not find any entity with id=${carListingId}`,
          );
        }
      }

      const carAvailability = manager.getRepository(CarAvailability).create({
        start_date: createCarAvailabilityDto.startDate,
        end_date: createCarAvailabilityDto.endDate,
      });
      await manager.getRepository(CarAvailability).save(carAvailability);

      carListing.car_availability = [
        ...carListing.car_availability,
        carAvailability,
      ];

      car_availability = await manager
        .getRepository(CarListing)
        .save(carListing);
    });
    return car_availability;
  }

  public async updateAvailabilityTime(
    carAvailabilityId: number,
    updateCarAvailabilityDto: UpdateCarAvailabilityDto,
  ): Promise<CarAvailability> {
    const [carAvailability, carAvailabilityError] = await handleAsyncError(
      this.carAvailabilityRepository.findOneOrFail({ id: carAvailabilityId }),
    );
    if (carAvailabilityError) {
      if (carAvailabilityError instanceof EntityNotFoundError) {
        throw new BadRequestException(
          `Could not find any entity with id=${carAvailabilityId}`,
        );
      }
    }

    carAvailability.start_date = updateCarAvailabilityDto.startDate;
    carAvailability.end_date = updateCarAvailabilityDto.endDate;

    const updatedCarAvailability = await this.carAvailabilityRepository.save(
      carAvailability,
    );
    return updatedCarAvailability;
  }
}

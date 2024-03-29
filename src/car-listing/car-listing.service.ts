import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, EntityNotFoundError, In, Repository } from 'typeorm';

import { CarAvailability } from '../car-entity/car-availability.entity';
import { CarFeatures } from '../car-entity/car-features.entity';
import { CarListing } from '../car-entity/car-listing.entity';
import { Car } from '../car-entity/car.entity';
// import { CarTimeSlot } from '../car-entity/car-time-slot.entity';
import { CreateCarListingDto, UpdateCarListingDto } from './car-listing.dto';
import { CarListingInterface } from './car-listing.interface';

import { handleAsyncError } from '../../utilities/error-handler';
// import * as dayjs from 'dayjs';
// import { calculateDaysBetweenTwoDates } from '../../utilities/date-manipulation';

@Injectable()
export class CarListingService implements CarListingInterface {
  constructor(
    private readonly connection: Connection,
    @InjectRepository(CarListing)
    private readonly carListingRepository: Repository<CarListing>,
  ) {}

  public async addCarListing(
    createCarListingDto: CreateCarListingDto,
  ): Promise<CarListing> {
    let result;

    await this.connection.manager.transaction(async (manager) => {
      // step 1. create car object
      const car_feature = await manager.find(CarFeatures, {
        where: { feature: In(createCarListingDto.car.carFeatures) },
      });

      const car = await manager.create(Car, {
        brand: createCarListingDto.car.brand,
        model: createCarListingDto.car.model,
        features: car_feature,
        description: createCarListingDto.car.description,
        images: createCarListingDto.car.images,
      });
      const car_created = await manager.getRepository(Car).save(car);

      // step 2: #TODO: validate the inputs such as lat, lng (using google maps api)

      // step 3: #TODO: create car_time_slot object
      // calculate number of days between 2 dates
      // if numberOfAvailableDays = 0, set numberOfAvailableDays = 1 instead to create at least 1 time slot
      //   const numberOfAvailableDays =
      //     calculateDaysBetweenTwoDates(
      //       dayjs(createCarListingDto.carAvailability.startDate),
      //       dayjs(createCarListingDto.carAvailability.endDate),
      //     ) || 1;

      // #TODO: create logic to track current time, to check whether time slot received from
      // createCarListingDto.carAvailability.carAvailabilityTimeSlot is still valid on car_time_slot
      // creation time

      // step 4: create car-availability object
      const car_availability = await manager.create(CarAvailability, {
        start_date: createCarListingDto.carAvailability.startDate,
        end_date: createCarListingDto.carAvailability.endDate,
      });
      const car_availability_created = await manager
        .getRepository(CarAvailability)
        .save(car_availability);

      // step 5: create car listing object
      const car_listing = await manager.create(CarListing, {
        car: car_created,
        location: createCarListingDto.pickupLocation,
        lat: createCarListingDto.lat,
        lng: createCarListingDto.lng,
        price: createCarListingDto.pricePerHour,
        car_availability: [car_availability_created],
      });
      result = await manager.getRepository(CarListing).save(car_listing);
    });
    return result;
  }

  public async getAllCarListings(): Promise<CarListing[]> {
    return await this.carListingRepository.find();
  }

  public async getCarListingsById(id: number): Promise<CarListing> {
    const [carListing, carListingError] = await handleAsyncError(
      this.carListingRepository
        .createQueryBuilder('listing')
        .leftJoinAndSelect('listing.car', 'car')
        .leftJoinAndSelect('listing.car_availability', 'car_availability')
        .where('listing.id = :id', { id })
        .getOneOrFail(),
    );
    if (carListingError) {
      if (carListingError instanceof EntityNotFoundError) {
        throw new BadRequestException(
          `Could not find any entity with id=${id}`,
        );
      }
    }
    return carListing;
  }

  // #TODO: not priority, not in requirements
  public async updateCarListingById(
    id: number,
    updateCarListingDto: UpdateCarListingDto,
  ) {
    throw new Error('Method not implemented.');
  }

  public async deleteCarListing(id: number): Promise<void> {
    await this.connection.manager.transaction(async (manager) => {
      const [carListing, carListingError] = await handleAsyncError(
        manager
          .getRepository(CarListing)
          .createQueryBuilder('listing')
          .leftJoinAndSelect('listing.car', 'car')
          .leftJoinAndSelect('listing.car_availability', 'car_availability')
          .where('listing.id = :id', { id })
          .getOneOrFail(),
      );
      if (carListingError) {
        if (carListingError instanceof EntityNotFoundError) {
          throw new BadRequestException(
            `Could not find any entity with id=${id}`,
          );
        }
      }

      await manager.getRepository(Car).remove(carListing.car);
      await manager.getRepository(CarListing).remove(carListing);
    });
  }
}

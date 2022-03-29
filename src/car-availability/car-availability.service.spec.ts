import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

import { CarListing } from '../car-entity/car-listing.entity';
import { CarAvailability } from '../car-entity/car-availability.entity';
import { CarAvailabilityService } from './car-availability.service';

import { Connection } from 'typeorm';

describe('CarAvailabilityService', () => {
  let service: CarAvailabilityService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: Connection,
          useValue: {},
        },
        {
          provide: getRepositoryToken(CarListing),
          useValue: {
            createQueryBuilder: jest.fn(),
          },
        },
        {
          provide: getRepositoryToken(CarAvailability),
          useValue: {
            findOneOrFail: jest.fn(),
            save: jest.fn(),
          },
        },
        CarAvailabilityService,
      ],
    }).compile();

    service = module.get<CarAvailabilityService>(CarAvailabilityService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

import { Test, TestingModule } from '@nestjs/testing';

import { CarListingController } from './car-listing.controller';
import { CarListingService } from './car-listing.service';

describe('CarListingController', () => {
  let controller: CarListingController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CarListingController],
      providers: [
        {
          provide: CarListingService,
          useValue: {
            addCarListing: jest.fn(),
            getAllCarListings: jest.fn(),
            getCarListingsById: jest.fn(),
            updateCarListingById: jest.fn(),
            deleteCarListing: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<CarListingController>(CarListingController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

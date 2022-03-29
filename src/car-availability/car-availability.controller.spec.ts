import { Test, TestingModule } from '@nestjs/testing';
import { CarAvailabilityController } from './car-availability.controller';
import { CarAvailabilityService } from './car-availability.service';

describe('CarAvailabilityController', () => {
  let controller: CarAvailabilityController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CarAvailabilityController],
      providers: [
        {
          provide: CarAvailabilityService,
          useValue: {
            getCurrentTimings: jest.fn(),
            addAvailabilityTime: jest.fn(),
            updateAvailabilityTime: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<CarAvailabilityController>(
      CarAvailabilityController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { Connection } from 'typeorm';
import { CreateCarListingDto } from './car-listing.dto';
import { CarListingService } from './car-listing.service';
import { createCarListingStub } from './car-listing.stub';

describe('CarListingService', () => {
  let service: CarListingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: Connection,
          useValue: {},
        },
        CarListingService,
      ],
    }).compile();

    service = module.get<CarListingService>(CarListingService);

    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('CRUD operations for car listings', () => {
    let carListing: CreateCarListingDto;
    beforeEach(() => {
      carListing = createCarListingStub();
    });

    describe('Happy flow', () => {
      describe('create a new car listing', () => {
        describe('given car detail, car availability time slots, and other listing details', () => {
          test('it should create car listing', async () => {
            // expect(await service.addCarListing(carListing)).toEqual({
            //   id: expect.any(Number),
            //   ...carListing,
            // });
          });
        });
      });
    });
  });
});

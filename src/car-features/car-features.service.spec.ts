import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

import { CarFeatures } from '../car-entity/car-features.entity';
import { createCarFeaturesStub } from './car-features.stub';
import { CreateCarFeaturesDto } from './car-features.dto';
import { CarFeaturesService } from './car-features.service';
import { CustomLoggerService } from '../custom-logger/custom-logger.service';

describe('CarFeaturesService', () => {
  let service: CarFeaturesService;

  beforeEach(async () => {
    const stub = createCarFeaturesStub();
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: CustomLoggerService,
          useValue: {
            error: jest.fn(),
          },
        },
        {
          provide: getRepositoryToken(CarFeatures),
          useValue: {
            create: jest.fn(async () => ({ feature: stub.feature })),
            save: jest.fn(async () => null),
            find: jest.fn(async () => [stub]),
            findOneOrFail: jest.fn(async () => stub),
            remove: jest.fn(async () => null),
          },
        },
        CarFeaturesService,
      ],
    }).compile();

    service = module.get<CarFeaturesService>(CarFeaturesService);

    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('CRUD operations for car features', () => {
    let stub: CreateCarFeaturesDto;
    beforeEach(() => {
      stub = createCarFeaturesStub();
    });

    describe('Happy flow', () => {
      describe('create a new feature', () => {
        describe('given a feature name: automatic', () => {
          test('it should create a new feature in db', async () => {
            expect(await service.addNewFeature(stub.feature)).toEqual(null);
          });
        });

        describe('retrieve all features', () => {
          describe('given _', () => {
            test('it should retrieve all features from database', async () => {
              expect(await service.getAllFeatures()).toEqual([stub]);
            });
          });
        });

        describe('retrieve one specific feature by name', () => {
          describe('given a feature name', () => {
            test('it should retrieve the specific feature from database', async () => {
              expect(await service.getFeatureByName(stub.feature)).toEqual(
                stub,
              );
            });
          });
        });

        describe('update one specific feature by name', () => {
          describe('given an old feature name and a new feature name', () => {
            test('it should update the specific feature name with the new feature name in the database', async () => {
              jest.spyOn(service, 'updateFeatureByName');

              await service.updateFeatureByName(stub.feature, 'manual');

              expect(service.updateFeatureByName).toBeCalled();
              expect(service.updateFeatureByName).toBeCalledWith(
                stub.feature,
                'manual',
              );
            });
          });
        });

        describe('delete one specific feature by name', () => {
          describe('a feature name', () => {
            test('it should delete the specific feature from database', async () => {
              jest.spyOn(service, 'deleteFeature');

              await service.deleteFeature(stub.feature);

              expect(service.deleteFeature).toBeCalled();
              expect(service.deleteFeature).toBeCalledWith(stub.feature);
            });
          });
        });
      });
    });
  });
});

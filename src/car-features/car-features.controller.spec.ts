import { Test, TestingModule } from '@nestjs/testing';
import { CarFeaturesController } from './car-features.controller';
import { CarFeaturesService } from './car-features.service';

describe('CarFeaturesController', () => {
  let controller: CarFeaturesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CarFeaturesController],
      providers: [
        {
          provide: CarFeaturesService,
          useValue: {
            addNewFeature: jest.fn(),
            getAllFeatures: jest.fn(),
            getFeatureByName: jest.fn(),
            updateFeatureByName: jest.fn(),
            deleteFeature: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<CarFeaturesController>(CarFeaturesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

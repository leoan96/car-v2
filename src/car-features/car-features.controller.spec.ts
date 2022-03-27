import { Test, TestingModule } from '@nestjs/testing';
import { CarFeaturesController } from './car-features.controller';

describe('CarFeaturesController', () => {
  let controller: CarFeaturesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CarFeaturesController],
    }).compile();

    controller = module.get<CarFeaturesController>(CarFeaturesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

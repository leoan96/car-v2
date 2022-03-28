import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { CarFeatures } from '../car-entity/car-features.entity';
import { CarFeaturesInterface } from './car-features.interface';
import {
  handleAsyncError,
  isPostgresTypeOrmDuplicateKeyError,
} from '../../utilities/error-handler';

import { Repository } from 'typeorm';

@Injectable()
export class CarFeaturesService implements CarFeaturesInterface {
  constructor(
    @InjectRepository(CarFeatures)
    private readonly carFeaturesRepository: Repository<CarFeatures>,
  ) {}

  public async addNewFeature(featureName: string): Promise<CarFeatures> {
    const feature = this.carFeaturesRepository.create({
      feature: featureName,
    });

    const [newFeature, newFeatureError]: [CarFeatures, unknown] =
      await handleAsyncError(this.carFeaturesRepository.save(feature));
    if (newFeatureError) {
      if (isPostgresTypeOrmDuplicateKeyError(newFeatureError)) {
        throw new BadRequestException('duplicate key error');
      }
    }
    return newFeature;
  }

  public async getAllFeatures(): Promise<CarFeatures[]> {
    const [features]: [CarFeatures[], unknown] = await handleAsyncError(
      this.carFeaturesRepository.find(),
    );
    return features;
  }

  public async getFeatureByName(featureName: string): Promise<CarFeatures> {
    const [feature, featureError]: [CarFeatures, unknown] =
      await handleAsyncError(
        this.carFeaturesRepository.findOneOrFail({
          feature: featureName,
        }),
      );
    if (featureError) {
      throw new BadRequestException('Invalid feature name given');
    }
    return feature;
  }

  public async updateFeatureByName(
    oldFeatureName: string,
    newFeatureName: any,
  ): Promise<CarFeatures> {
    const [oldFeature, oldFeatureError]: [CarFeatures, unknown] =
      await handleAsyncError(this.getFeatureByName(oldFeatureName));
    if (oldFeatureError) {
      throw new BadRequestException('Invalid feature name given');
    }

    oldFeature.feature = newFeatureName;
    return await this.carFeaturesRepository.save(oldFeature);
  }

  public async deleteFeature(featureName: string): Promise<void> {
    const [feature, featureError] = await handleAsyncError(
      this.carFeaturesRepository.findOneOrFail({ feature: featureName }),
    );
    if (featureError) {
      throw new BadRequestException('Feature does not exist');
    }
    await handleAsyncError(this.carFeaturesRepository.remove(feature));
  }
}

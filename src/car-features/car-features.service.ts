import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { CarFeatures } from '../car-entity/car-features.entity';
import { CarFeaturesInterface } from './car-features.interface';
import {
  handleAsyncError,
  INTERNAL_SERVER_ERROR_MESSAGE,
  isPostgresTypeOrmDuplicateKeyError,
  isPostgresTypeOrmEntityNotFoundError,
} from '../../utilities/error-handler';
import { CustomLoggerService } from '../custom-logger/custom-logger.service';

import { Repository } from 'typeorm';

@Injectable()
export class CarFeaturesService implements CarFeaturesInterface {
  constructor(
    @InjectRepository(CarFeatures)
    private readonly carFeaturesRepository: Repository<CarFeatures>,
    private readonly logger: CustomLoggerService,
  ) {}

  public async addNewFeature(featureName: string): Promise<CarFeatures> {
    const feature = this.carFeaturesRepository.create({
      feature: featureName,
    });

    const [newFeature, newFeatureError]: [CarFeatures, unknown] =
      await handleAsyncError(this.carFeaturesRepository.save(feature));
    if (newFeatureError) {
      this.logger.error(newFeatureError);
      if (isPostgresTypeOrmDuplicateKeyError(newFeatureError)) {
        throw new BadRequestException('duplicate key error');
      }
      throw new InternalServerErrorException(INTERNAL_SERVER_ERROR_MESSAGE);
    }
    return newFeature;
  }

  public async getAllFeatures(): Promise<CarFeatures[]> {
    const [features, featuresError]: [CarFeatures[], unknown] =
      await handleAsyncError(this.carFeaturesRepository.find());
    if (featuresError) {
      this.logger.error(featuresError);
    }
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
      this.logger.error(featureError);
      throw new BadRequestException(featureError);
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
      this.logger.error(oldFeatureError);
      if (isPostgresTypeOrmEntityNotFoundError(oldFeatureError)) {
        throw new BadRequestException('Invalid feature name given');
      }
      throw new InternalServerErrorException(INTERNAL_SERVER_ERROR_MESSAGE);
    }

    oldFeature.feature = newFeatureName;
    return await this.carFeaturesRepository.save(oldFeature);
  }

  public async deleteFeature(featureName: string): Promise<void> {
    const [feature, featureError] = await handleAsyncError(
      this.carFeaturesRepository.find({ feature: featureName }),
    );
    if (featureError) {
      this.logger.error(featureError);
      throw new BadRequestException('Invalid feature name given');
    }
    await handleAsyncError(this.carFeaturesRepository.remove(feature));
  }
}

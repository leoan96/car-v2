import { CarFeatures } from '../car-entity/car-features.entity';

export interface CarFeaturesInterface {
  addNewFeature(featureName: string): Promise<CarFeatures>;
  getAllFeatures(): Promise<CarFeatures[]>;
  getFeatureByName(featureName: string): Promise<CarFeatures>;
  updateFeatureByName(
    oldFeatureName: string,
    newFeatureName,
  ): Promise<CarFeatures>;
  deleteFeature(featureName: string): Promise<void>;
}

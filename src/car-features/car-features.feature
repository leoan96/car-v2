Feature: CRUD operations for car features

    - Create, read, update, delete operations being applied to the car-features database

    Rule: Feature name must be unique
        Example: feature name of 'automatic' was given for the first time
            Given feature name of automatic
            When there is a request to CarFeaturesService
            Then it should be valid

        Example: feature name of 'automatic' was given for the second time
            Given feature name of automatic
            When there is a request to CarFeaturesService
            Then it should be invalid

    Scenario: Happy flow

        Scenario: create a new feature
            Given a feature name (string)
            When there is a POST request to CarFeaturesService.addNewFeature(featureName: string)
            Then use car-feature repository
            And save it to database

        Scenario: retrieve all features
            Given _ (empty)
            When there is a GET request to CarFeaturesService.getAllFeatures()
            Then use car-feature repository
            And retrieve all features from database (CarFeatures[])

        Scenario: retrieve one specific feature by name
            Given a feature name (string)
            When there is a GET request to CarFeaturesService.getFeatureByName(featureName: string)
            Then use car-feature repository
            And retrieve the specific feature from database (CarFeature)

        Scenario: update one specific feature by name
            Given a feature name (string)
            And a new feature name (string)

            When there is a PATCH request to CarFeaturesService.updateFeatureByName(featureName: string, newFeatureName: string)
            Then use car-feature repository
            And update the specific feature name with the new feature name in the database (CarFeature)

        Scenario: delete one specific feature by name
            Given a feature name (string)
            When there is a DELETE request to CarFeaturesService.deleteFeature(featureName: string)
            Then use car-feature repository
            And delete the specific feature from database (void)
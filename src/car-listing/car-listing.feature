Feature: CRUD operations for car listings

    - Create, read, update, delete operations being applied to the car-listing database

    Rule: None

    Scenario: Happy flow

        Scenario: create a new car listing
            Given a car detail (brand: string, model: string, car features: CarFeatures[], description: string[], images: string[])
            And listing details (pickup location: string, lat: number, lng: number, price per hour: number, isAvailableForViewInCarListing: boolean,
                car-availability: number[] -> array holding the slot number of availability, i.e. slot 0 represents the time from 00:00 - 00:10,
                slot 1 represents time from 0:11 - 0:20)

            When there is a POST request to CarListingService.addCarListing(brand: string, model: string, car features: CarFeatures[], description: string[],
                 images: string[], pickup location: string, lat: number, lng: number, price per hour: number, isAvailableForViewInCarListing: boolean,
                 carAvailabilityTimeSlot: number[] -> array holding the slot number of availability, startDate: Date, endDate: Date)

            Then create car listing

                Rule: rollback all transactions should one of them fail
                    Example: car-availability fails to be created
                        Then car object would be rolled back

                    Scenario: step 1: create a new car
                        Given car details
                        When an attempt is made to create a new car object

                        Then check whether the car-features input received are valid and present in the car-features database
                        And check whether the car could be successfully created

                    Scenario: step 2: #TODO: validate the inputs such as lat, lng (using google maps api)

                    Scenario: step 3: create car-availability object
                        Given startDate
                        And endDate

                        Then initialize the process to create car-time-slot
                        And complete the creation and saving of car-availability object
                    
                    Scenario: step 4: create car-time-slot
                        Given an array of time slot

                        Then #TODO: process business rules such as time-slots must be contiguous (i.e. time-slot 1-3 instead of time-slot 1,4,5,8) 
                                    and minimum time for booking
                        And car-time-slot

        Scenario: retrieve all car listings (showing only model name, price, location)
            Given _ (empty)
            When there is a GET request to CarListingService.getAllCarListings()
            Then use car-listing repository
            And retrieve all car-listings from database (CarListings[])

        Scenario: retrieve one specific car listing by id (show full listing & car details)
            Given an id (number)
            When there is a GET request to CarListingService.getCarListingsById(id: number)
            Then use car-listings repository
            And retrieve the specific car listing from database (CarListings)

        Scenario: update car listing details
            Given an id (number)
            And an updated car listing object (UpdateCarListingDto)

            When there is a PATCH request to CarListingService.updateCarListingById(id: number, updateCarListingDto: UpdateCarListingDto)
            Then use car-feature repository
            And update the car listing with the new updateCarListingDto in the database (CarFeature)

        Scenario: delete car listing by id
            Given an id (number)
            When there is a DELETE request to CarListingService.deleteCarListing(id: number)
            Then use car-listing repository
            And delete the car listing from database (void)
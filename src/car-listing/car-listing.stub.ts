import { CreateCarListingDto } from './car-listing.dto';

export const sampleCreateCarListingInput1 = {
  pickupLocation: 'KL',
  lat: 2.124,
  lng: 192.12092,
  pricePerHour: 1200,
  isAvailableForViewInCarListing: true,
  images: 'test',
  car: {
    brand: 'BMW',
    model: '5 series',
    carFeatures: ['automatic', 'manual'],
    description: ['best in class', 'high tech'],
    images: ['sample1', 'sample2'],
  },
  carAvailability: {
    startDate: '2022-03-28T14:10:41.931Z',
    endDate: '2022-03-30T14:10:41.931Z',
    carAvailabilityTimeSlot: [40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50],
  },
};

export const sampleCreateCarListingInput2 = {
  pickupLocation: 'KL',
  lat: 2.124,
  lng: 192.12092,
  pricePerHour: 1200,
  isAvailableForViewInCarListing: true,
  images: 'test',
  car: {
    brand: 'Mercedes',
    model: 'E class',
    carFeatures: ['automatic', 'manual', '2wd'],
    description: ['best in class', 'high tech'],
    images: ['sample1', 'sample2'],
  },
  carAvailability: {
    startDate: '2022-03-28T14:10:41.931Z',
    endDate: '2022-03-31T14:10:41.931Z',
    carAvailabilityTimeSlot: [40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50],
  },
};

export const sampleCreateCarListingOutput1 = {
  location: 'KL',
  lat: 2.124,
  lng: 192.12092,
  price: 1200,
  car: {
    id: 15,
    brand: 'BMW',
    model: '5 series',
    description: ['best in class', 'high tech'],
    images: ['sample1', 'sample2'],
    features: [
      {
        id: 2,
        feature: '2wd',
      },
      {
        id: 4,
        feature: 'automatic',
      },
    ],
  },
  car_availability: [
    {
      id: 15,
      start_date: '2022-03-28T14:10:41.931Z',
      end_date: '2022-03-31T14:10:41.931Z',
    },
  ],
  id: 13,
  currency: 'MYR',
  cummulative_ratings: 0,
  total_number_of_ratings: 0,
  average_rating: 0,
  total_request_bookings: 0,
  total_acceptance: 0,
  response_rate_in_percentage: 0,
  response_time_in_minutes: 0,
  is_booked: false,
  is_locked: false,
  is_available_for_view_in_car_listing: true,
};

export const createCarListingStub = (): CreateCarListingDto => ({
  car: {
    brand: 'BMW',
    model: '5 series',
    carFeatures: ['automatic', 'RON97'],
    description: ['best in class', 'sporty'],
    images: [
      'http://s3-us-east-1.amazonaws.com/bucket/sample1',
      'http://s3-us-east-1.amazonaws.com/bucket/sample2',
    ],
  },
  carAvailability: {
    startDate: '2022-03-28T14:10:41.931Z',
    endDate: '2022-03-30T14:10:41.931Z',
    carAvailabilityTimeSlot: [40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50],
  },
  pickupLocation: 'Ioi Resort, 62502 Serdang, Selangor',
  lat: 2.969028,
  lng: 101.713077,
  pricePerHour: 1300,
  isAvailableForViewInCarListing: true,
});

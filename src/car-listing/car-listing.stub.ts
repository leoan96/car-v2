import { CreateCarListingDto } from './car-listing.dto';

export const sampleCreateCarListingInput = {
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

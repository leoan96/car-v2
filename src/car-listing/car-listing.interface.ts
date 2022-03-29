import { CarListing } from '../car-entity/car-listing.entity';
import { CreateCarListingDto, UpdateCarListingDto } from './car-listing.dto';

export interface CarListingInterface {
  addCarListing(createCarListingDto: CreateCarListingDto): Promise<CarListing>;
  getAllCarListings(): Promise<CarListing[]>;
  getCarListingsById(id: number): Promise<CarListing>;
  updateCarListingById(id: number, updateCarListingDto: UpdateCarListingDto);
  deleteCarListing(id: number);
}

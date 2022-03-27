import {
  Column,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Car } from './car.entity';
import { CarAvailability } from './car-availability.entity';

@Entity()
export class CarListing {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => Car, { cascade: true, onDelete: 'CASCADE' })
  car: Car;

  @Column({ type: 'varchar', length: 150 })
  location: string;

  @Column({ type: 'float4' })
  lat: number;

  @Column({ type: 'float4' })
  lng: number;

  @Column({ type: 'varchar', length: 3 })
  currency: string;

  @Column({ type: 'int4' })
  price: number;

  @Column({ type: 'int4' })
  cummulative_ratings: number;

  @Column({ type: 'int4' })
  total_number_of_ratings: number;

  @Column({ type: 'float4' })
  average_rating: number;

  @Column({ type: 'int4' })
  total_request_bookings: number;

  @Column({ type: 'int4' })
  total_acceptance: number;

  @Column({ type: 'float4' })
  response_rate_in_percentage: number;

  @Column({ type: 'int4' })
  response_time_in_minutes: number;

  @Column()
  is_booked: boolean;

  @Column()
  is_locked: boolean;

  @Column()
  is_available_for_view_in_car_listing: boolean;

  // https://stackoverflow.com/questions/55098023/typeorm-cascade-option-cascade-ondelete-onupdate
  @OneToMany(
    () => CarAvailability,
    (availability) => availability.car_listing,
    {
      cascade: true,
      onDelete: 'CASCADE',
    },
  )
  car_availability: CarAvailability[];
}

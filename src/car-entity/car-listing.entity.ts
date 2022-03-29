import {
  Column,
  Entity,
  JoinColumn,
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

  // https://github.com/typeorm/typeorm/issues/3218 (onDelete: "CASCADE does not work for OneToOne relation?")
  @OneToOne(() => Car, { cascade: true, onDelete: 'CASCADE', nullable: false })
  @JoinColumn()
  car: Car;

  @Column({ type: 'varchar', length: 150, nullable: false })
  location: string;

  @Column({ type: 'float4', nullable: false })
  lat: number;

  @Column({ type: 'float4', nullable: false })
  lng: number;

  @Column({ type: 'varchar', length: 3, default: 'MYR' })
  currency: string;

  @Column({ type: 'int4', nullable: false })
  price: number;

  @Column({ type: 'int4', default: 0 })
  cummulative_ratings: number;

  @Column({ type: 'int4', default: 0 })
  total_number_of_ratings: number;

  @Column({ type: 'float4', default: 0 })
  average_rating: number;

  @Column({ type: 'int4', default: 0 })
  total_request_bookings: number;

  @Column({ type: 'int4', default: 0 })
  total_acceptance: number;

  @Column({ type: 'float4', default: 0 })
  response_rate_in_percentage: number;

  @Column({ type: 'int4', default: 0 })
  response_time_in_minutes: number;

  @Column({ default: false })
  is_booked: boolean;

  @Column({ default: false })
  is_locked: boolean;

  @Column({ default: true })
  is_available_for_view_in_car_listing: boolean;

  // https://stackoverflow.com/questions/55098023/typeorm-cascade-option-cascade-ondelete-onupdate (difference between cascade & onDelete: "CASCADE")
  // https://github.com/typeorm/typeorm/issues/1782 (required to set onDelete: "CASCADE" on both OneToMany & ManyToMany for cascade delete to work...)
  @OneToMany(
    () => CarAvailability,
    (availability) => availability.car_listing,
    {
      cascade: true,
      onDelete: 'CASCADE',
    },
  )
  @JoinColumn()
  car_availability: CarAvailability[];
}

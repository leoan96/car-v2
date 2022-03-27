import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { CarListing } from './car-listing.entity';
import { CarTimeSlot } from './car-time-slot.entity';

@Entity()
export class CarAvailability {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => CarListing, (listing) => listing.car_availability)
  car_listing: CarListing;

  @Column({ type: 'timestamptz' })
  start_date: Date;

  @Column({ type: 'timestamptz' })
  end_date: Date;

  @OneToMany(() => CarTimeSlot, (time_slot) => time_slot.car_availability, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  car_time_slot: CarTimeSlot[];
}

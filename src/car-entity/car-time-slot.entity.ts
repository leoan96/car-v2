// import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
// import { CarAvailability } from './car-availability.entity';

// @Entity()
// export class CarTimeSlot {
//   @PrimaryGeneratedColumn()
//   id: number;

//   @ManyToOne(
//     () => CarAvailability,
//     (availability) => availability.car_time_slot,
//   )
//   car_availability: CarAvailability;

//   @Column({ type: 'timestamptz' })
//   date: Date;

//   @Column({ type: 'boolean', array: true })
//   slots: boolean;
// }

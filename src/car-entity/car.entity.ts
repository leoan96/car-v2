import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { CarFeatures } from './car-features.entity';

@Entity()
export class Car {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 30 })
  brand: string;

  @Column({ type: 'varchar', length: 30 })
  model: string;

  @Column({ type: 'varchar', array: true })
  description: string[];

  @Column({ type: 'varchar', array: true })
  images: string[];

  @ManyToMany(() => CarFeatures, (feature) => feature.car, { cascade: true })
  @JoinTable()
  features: CarFeatures[];
}

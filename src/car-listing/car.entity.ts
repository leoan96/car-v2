import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { CarFeatures } from './car-features.entity';

@Entity()
export class Car {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  brand: string;

  @Column()
  model: string;

  @Column({ array: true })
  description: string;

  @Column({ array: true })
  images: string;

  @OneToMany(() => CarFeatures, (feature) => feature.feature)
  features: CarFeatures[];
}

import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class CarFeatures {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  feature: string;
}

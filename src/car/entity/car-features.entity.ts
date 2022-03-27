import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class CarFeatures {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 30 })
  feature: string;
}

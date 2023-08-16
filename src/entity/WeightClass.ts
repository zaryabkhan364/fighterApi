import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Fighter } from './Fighter';
import { Ranking } from './Ranking';

@Entity({ name: 'weightclasses' })
export class WeightClass {
  @PrimaryGeneratedColumn()
  weight_class_id: number;

  @Column({ type: 'varchar', length: 50, nullable: false })
  weight_class_name: string;

  @OneToMany(() => Fighter, fighter => fighter.weightClass)
  fighters: Fighter[];

  @OneToMany(() => Ranking, ranking => ranking.weightClass)
  rankings: Ranking[];
}

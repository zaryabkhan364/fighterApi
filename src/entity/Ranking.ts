import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { WeightClass } from './WeightClass';
import { Fighter } from './Fighter';

@Entity({name : 'rankings'})
export class Ranking {
  @PrimaryGeneratedColumn()
  ranking_id: number;

  @ManyToOne(() => WeightClass, weightClass => weightClass.rankings)
  @JoinColumn({ name: 'weight_class_id' })
  weightClass: WeightClass;

  @ManyToOne(() => Fighter, fighter => fighter.rankings)
  @JoinColumn({ name: 'fighter_id' })
  fighter: Fighter;

  @Column({ type: 'int', nullable: true })
  rank: number;
}

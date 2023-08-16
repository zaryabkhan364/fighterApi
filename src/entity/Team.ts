import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Fighter } from './Fighter';

@Entity({name :'teams'})
export class Team {
  @PrimaryGeneratedColumn()
  team_id: number;

  @Column({ type: 'varchar', length: 100, nullable: false })
  team_name: string;

  @OneToMany(() => Fighter, fighter => fighter.team)
  fighters: Fighter[];
}

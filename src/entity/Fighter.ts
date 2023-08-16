import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { WeightClass } from './WeightClass';
import { Team } from './Team';
import { Fight } from './Fight';
import { Ranking } from './Ranking';

@Entity({name :'fighters'})
export class Fighter {
  @PrimaryGeneratedColumn()
  fighter_id: number;

  @Column({ type: 'varchar', length: 255, nullable: false })
  full_name: string;

  @Column({ type: 'date', nullable: true })
  date_of_birth: Date;

  @Column({ type: 'int', nullable: true })
  height: number;

  @Column({ type: 'varchar', length: 50, nullable: true })
  nationality: string;

  @ManyToOne(() => WeightClass, weightClass => weightClass.fighters)
  @JoinColumn({ name: 'weight_class_id' })
  weightClass: WeightClass;

  @ManyToOne(() => Team, team => team.fighters)
  @JoinColumn({ name: 'team_id' })
  team: Team;

  @Column({ type: 'int', default: 0 })
  wins: number;

  @Column({ type: 'int', default: 0 })
  losses: number;

  @Column({ type: 'int', default: 0 })
  knockouts: number;

  @Column({ type: 'int', default: 0 })
  submissions: number;

  @Column({ type: 'text', nullable: true })
  other_statistics: string;

  @OneToMany(() => Fight, fight => fight.fighter1)
  fightsAsFighter1: Fight[];

  @OneToMany(() => Fight, fight => fight.fighter2)
  fightsAsFighter2: Fight[];

  @OneToMany(() => Ranking, ranking => ranking.fighter)
  rankings: Ranking[];
}

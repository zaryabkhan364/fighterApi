import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Event } from './Event';
import { Fighter } from './Fighter';

@Entity({name  : 'fights'})
export class Fight {
  @PrimaryGeneratedColumn()
  fight_id: number;

  @ManyToOne(() => Event, event => event.fights)
  @JoinColumn({ name: 'event_id' })
  event: Event;

  @ManyToOne(() => Fighter, fighter => fighter.fightsAsFighter1)
  @JoinColumn({ name: 'fighter1_id' })
  fighter1: Fighter;

  @ManyToOne(() => Fighter, fighter => fighter.fightsAsFighter2)
  @JoinColumn({ name: 'fighter2_id' })
  fighter2: Fighter;

  @Column({ type: 'varchar', length: 50, nullable: true })
  result: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  method: string;

  @Column({ type: 'int', nullable: true })
  end_round: number;

  @Column({ type: 'time', nullable: true })
  time: string;
}

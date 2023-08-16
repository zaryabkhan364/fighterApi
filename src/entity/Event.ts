import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Fight } from './Fight';

@Entity({name :  'events'})
export class Event {
  @PrimaryGeneratedColumn()
  event_id: number;

  @Column({ type: 'varchar', length: 255, nullable: false })
  event_name: string;

  @Column({ type: 'date', nullable: true })
  event_date: Date;

  @Column({ type: 'varchar', length: 100, nullable: true })
  location: string;

  @OneToMany(() => Fight, fight => fight.event)
  fights: Fight[];
}

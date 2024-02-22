import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class History {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  record: number;

  @Column()
  date: Date;
}

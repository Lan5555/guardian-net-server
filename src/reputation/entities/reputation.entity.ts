import { Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('reputation')
export class Reputation {
  @PrimaryGeneratedColumn()
  id!: number;
  user_id!: number;
  reputation_count!: number;
  createdAt!: Date;
}

import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('reputation')
export class Reputation {
  @PrimaryGeneratedColumn()
  id!: number;
  @Column({ unique: true })
  user_id!: number;
  @Column()
  reputation_count!: number;
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt!: Date;
}

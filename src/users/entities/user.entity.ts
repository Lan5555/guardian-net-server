import { Community } from 'src/community/entities/community.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  JoinColumn,
  ManyToOne,
} from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 100, nullable: true })
  name!: string;

  @Column({ length: 100, unique: true })
  email!: string;

  @Column({ length: 100, nullable: true })
  password!: string;

  @Column({ name: 'community_id', nullable: true })
  community_id!: number;

  @ManyToOne(() => Community, (community) => community.users)
  @JoinColumn({ name: 'community_id' })
  community!: Community;

  @Column({ name: 'phone', unique: true })
  phone!: string;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt!: Date;
}

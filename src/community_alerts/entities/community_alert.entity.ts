import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Community } from '../../community/entities/community.entity';

@Entity('community_alerts')
export class CommunityAlert {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 100, nullable: true })
  subject!: string;

  @Column({ length: 150, nullable: true })
  title!: string;

  @Column({ length: 255, nullable: true })
  message!: string;

  @Column({ length: 150, nullable: true })
  location!: string;

  @ManyToOne(() => Community)
  @JoinColumn({ name: 'community_id' })
  community_id!: number;

  @CreateDateColumn({ name: 'createdAt' })
  createdAt!: Date;
}

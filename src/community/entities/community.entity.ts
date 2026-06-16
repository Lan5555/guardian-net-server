import { User } from 'src/users/entities/user.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity('community')
export class Community {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 255, nullable: true })
  name!: string;

  @Column({ length: 255, nullable: true })
  location!: string;

  @Column({ type: 'float', nullable: true })
  longitude!: number;

  @Column({ type: 'float', nullable: true })
  latitude!: number;

  @OneToMany(() => User, (user) => user.community)
  users!: User[];

  createdAt!: Date;
}

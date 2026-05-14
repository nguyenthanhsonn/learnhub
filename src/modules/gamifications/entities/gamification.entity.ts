import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn, } from 'typeorm';
import { User } from '../../users/entities/user.entity';

@Entity('gamification')
export class Gamification {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'user_id', unique: true })
  userId: string;

  @Column({ name: 'xp_total', default: 0 })
  xpTotal: number;

  @Column({ default: 1 })
  level: number;

  @Column({ name: 'streak_days', default: 0 })
  streakDays: number;

  @Column({ name: 'last_activity_date', type: 'date', nullable: true })
  lastActivityDate?: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @OneToOne(() => User, (user) => user.gamification, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id' })
  user: User;
}
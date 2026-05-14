import { Column, CreateDateColumn, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn, } from 'typeorm';
import { UserRole } from '../../../shared/enums';
import { Course } from '../../courses/entities/course.entity';
import { Enrollment } from '../../enrollments/entities/enrollment.entity';
import { Review } from '../../reviews/entities/review.entity';
import { Gamification } from '../../gamifications/entities/gamification.entity';
import { XpTransaction } from '../../xp-transactions/entities/xp-transaction.entity';
import { Notification } from '../../notifications/entities/notification.entity';
import { Comment } from '../../comments/entities/comment.entity';
import { QuizAttempt } from '../../quiz-attempts/entities/quiz-attempt.entity';
import { AiChatSession } from '../../ai-chat/entities/ai-chat.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'full_name' })
  fullName: string;

  @Column({ unique: true })
  email: string;

  @Column({ name: 'password_hash' })
  passwordHash: string;

  @Column({ name: 'refresh_token', type: 'text', nullable: true })
  refreshToken?: string;

  @Column({ name: 'password_reset_otp_hash', type: 'text', nullable: true })
  passwordResetOtpHash?: string;

  @Column({
    name: 'password_reset_otp_expires_at',
    type: 'timestamp',
    nullable: true,
  })
  passwordResetOtpExpiresAt?: Date;

  @Column({ name: 'avatar_url', nullable: true })
  avatarUrl?: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.STUDENT,
  })
  role: UserRole;

  @Column({ name: 'is_active', default: true })
  isActive: boolean;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @OneToMany(() => Course, (course) => course.instructor)
  courses: Course[];

  @OneToMany(() => Enrollment, (enrollment) => enrollment.user)
  enrollments: Enrollment[];

  @OneToMany(() => Review, (review) => review.user)
  reviews: Review[];

  @OneToOne(() => Gamification, (gamification) => gamification.user)
  gamification: Gamification;

  @OneToMany(() => XpTransaction, (transaction) => transaction.user)
  xpTransactions: XpTransaction[];

  @OneToMany(() => Notification, (notification) => notification.user)
  notifications: Notification[];

  @OneToMany(() => Comment, (comment) => comment.user)
  comments: Comment[];

  @OneToMany(() => QuizAttempt, (attempt) => attempt.user)
  quizAttempts: QuizAttempt[];

  @OneToMany(() => AiChatSession, (session) => session.user)
  aiChatSessions: AiChatSession[];
}

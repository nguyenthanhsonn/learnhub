import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, Unique, } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Course } from '../../courses/entities/course.entity';
import { LessonProgress } from '../../lesson-progress/entities/lesson-progress.entity';

@Entity('enrollments')
@Unique(['userId', 'courseId'])
export class Enrollment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'user_id' })
  userId: string;

  @Column({ name: 'course_id' })
  courseId: string;

  @Column({ name: 'progress_percent', type: 'float', default: 0 })
  progressPercent: number;

  @CreateDateColumn({ name: 'enrolled_at' })
  enrolledAt: Date;

  @Column({ name: 'completed_at', type: 'timestamp', nullable: true })
  completedAt?: Date;

  @ManyToOne(() => User, (user) => user.enrollments, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Course, (course) => course.enrollments, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'course_id' })
  course: Course;

  @OneToMany(() => LessonProgress, (progress) => progress.enrollment)
  lessonProgress: LessonProgress[];
}
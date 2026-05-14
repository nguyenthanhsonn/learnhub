import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Unique, UpdateDateColumn} from 'typeorm';
import { Enrollment } from '../../enrollments/entities/enrollment.entity';
import { Lesson } from '../../lessons/entities/lesson.entity';

@Entity('lesson_progress')
@Unique(['enrollmentId', 'lessonId'])
export class LessonProgress {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'enrollment_id' })
  enrollmentId: string;

  @Column({ name: 'lesson_id' })
  lessonId: string;

  @Column({ name: 'is_completed', default: false })
  isCompleted: boolean;

  @Column({ name: 'last_position_sec', default: 0 })
  lastPositionSec: number;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @ManyToOne(() => Enrollment, (enrollment) => enrollment.lessonProgress, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'enrollment_id' })
  enrollment: Enrollment;

  @ManyToOne(() => Lesson, (lesson) => lesson.lessonProgress, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'lesson_id' })
  lesson: Lesson;
}
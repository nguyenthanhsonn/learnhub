import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, } from 'typeorm';
import { CourseLevel, CourseStatus } from '../../../shared/enums';
import { User } from '../../users/entities/user.entity';
import { Category } from '../../categories/entities/category.entity';
import { Section } from '../../sections/entities/section.entity';
import { Enrollment } from '../../enrollments/entities/enrollment.entity';
import { Review } from '../../reviews/entities/review.entity';

@Entity('courses')
export class Course {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'instructor_id' })
  instructorId: string;

  @Column({ name: 'category_id', nullable: true })
  categoryId?: string;

  @Column()
  title: string;

  @Column({ unique: true })
  slug: string;

  @Column({ type: 'text', nullable: true })
  description?: string;

  @Column({ name: 'thumbnail_url', nullable: true })
  thumbnailUrl?: string;

  @Column({
    type: 'enum',
    enum: CourseLevel,
    default: CourseLevel.BEGINNER,
  })
  level: CourseLevel;

  @Column({
    type: 'enum',
    enum: CourseStatus,
    default: CourseStatus.DRAFT,
  })
  status: CourseStatus;

  @Column({ name: 'average_rating', type: 'float', default: 0 })
  averageRating: number;

  @Column({ name: 'total_students', default: 0 })
  totalStudents: number;

  @Column({ name: 'published_at', type: 'timestamp', nullable: true })
  publishedAt?: Date;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @ManyToOne(() => User, (user) => user.courses, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'instructor_id' })
  instructor: User;

  @ManyToOne(() => Category, (category) => category.courses, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'category_id' })
  category?: Category;

  @OneToMany(() => Section, (section) => section.course)
  sections: Section[];

  @OneToMany(() => Enrollment, (enrollment) => enrollment.course)
  enrollments: Enrollment[];

  @OneToMany(() => Review, (review) => review.course)
  reviews: Review[];
}
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, } from 'typeorm';
import { Course } from '../../courses/entities/course.entity';
import { Lesson } from '../../lessons/entities/lesson.entity';

@Entity('sections')
export class Section {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'course_id' })
  courseId: string;

  @Column()
  title: string;

  @Column({ name: 'order_index' })
  orderIndex: number;

  @ManyToOne(() => Course, (course) => course.sections, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'course_id' })
  course: Course;

  @OneToMany(() => Lesson, (lesson) => lesson.section)
  lessons: Lesson[];
}
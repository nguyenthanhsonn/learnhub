import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, } from 'typeorm';
import { LessonType } from '../../../shared/enums';
import { Section } from '../../sections/entities/section.entity';
import { LessonProgress } from '../../lesson-progress/entities/lesson-progress.entity';
import { Quiz } from '../../quizs/entities/quiz.entity';
import { Comment } from '../../comments/entities/comment.entity';
import { AiChatSession } from '../../ai-chat/entities/ai-chat.entity';

@Entity('lessons')
export class Lesson {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'section_id' })
  sectionId: string;

  @Column()
  title: string;

  @Column({
    type: 'enum',
    enum: LessonType,
    default: LessonType.VIDEO,
  })
  type: LessonType;

  @Column({ name: 'video_url', nullable: true })
  videoUrl?: string;

  @Column({ name: 'pdf_url', nullable: true })
  pdfUrl?: string;

  @Column({ name: 'duration_seconds', nullable: true })
  durationSeconds?: number;

  @Column({ name: 'order_index' })
  orderIndex: number;

  @ManyToOne(() => Section, (section) => section.lessons, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'section_id' })
  section: Section;

  @OneToMany(() => LessonProgress, (progress) => progress.lesson)
  lessonProgress: LessonProgress[];

  @OneToMany(() => Quiz, (quiz) => quiz.lesson)
  quizzes: Quiz[];

  @OneToMany(() => Comment, (comment) => comment.lesson)
  comments: Comment[];

  @OneToMany(() => AiChatSession, (session) => session.lesson)
  aiChatSessions: AiChatSession[];
}
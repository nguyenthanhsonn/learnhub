import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, } from 'typeorm';
import { Lesson } from '../../lessons/entities/lesson.entity';
import { Question } from '../../questions/entities/question.entity';
import { QuizAttempt } from '../../quiz-attempts/entities/quiz-attempt.entity';

@Entity('quizzes')
export class Quiz {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'lesson_id' })
  lessonId: string;

  @Column()
  title: string;

  @Column({ name: 'is_ai_generated', default: false })
  isAiGenerated: boolean;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @ManyToOne(() => Lesson, (lesson) => lesson.quizzes, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'lesson_id' })
  lesson: Lesson;

  @OneToMany(() => Question, (question) => question.quiz)
  questions: Question[];

  @OneToMany(() => QuizAttempt, (attempt) => attempt.quiz)
  attempts: QuizAttempt[];
}
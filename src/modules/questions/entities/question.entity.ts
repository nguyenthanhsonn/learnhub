import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Quiz } from '../../quizs/entities/quiz.entity';

@Entity('questions')
export class Question {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'quiz_id' })
  quizId: string;

  @Column({ type: 'text' })
  content: string;

  @Column({ type: 'jsonb' })
  options: string[];

  @Column({ name: 'correct_answer', type: 'text' })
  correctAnswer: string;

  @Column({ name: 'order_index' })
  orderIndex: number;

  @ManyToOne(() => Quiz, (quiz) => quiz.questions, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'quiz_id' })
  quiz: Quiz;
}

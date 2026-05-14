import { CreateDateColumn, Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Lesson } from '../../lessons/entities/lesson.entity';
import { AiChatMessage } from './ai-chat-message.entity';

@Entity('ai_chat_sessions')
export class AiChatSession {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'user_id' })
  userId: string;

  @Column({ name: 'lesson_id', nullable: true })
  lessonId?: string;

  @CreateDateColumn({ name: 'started_at' })
  startedAt: Date;

  @ManyToOne(() => User, (user) => user.aiChatSessions, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Lesson, (lesson) => lesson.aiChatSessions, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'lesson_id' })
  lesson?: Lesson;

  @OneToMany(() => AiChatMessage, (message) => message.session)
  messages: AiChatMessage[];
}
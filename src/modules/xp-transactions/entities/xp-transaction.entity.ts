import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, } from 'typeorm';
import { XpSourceType } from '../../../shared/enums';
import { User } from '../../users/entities/user.entity';

@Entity('xp_transactions')
export class XpTransaction {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'user_id' })
  userId: string;

  @Column({ name: 'xp_amount' })
  xpAmount: number;

  @Column({
    name: 'source_type',
    type: 'enum',
    enum: XpSourceType,
  })
  sourceType: XpSourceType;

  @Column({ name: 'source_id', type: 'uuid', nullable: true })
  sourceId?: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @ManyToOne(() => User, (user) => user.xpTransactions, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id' })
  user: User;
}
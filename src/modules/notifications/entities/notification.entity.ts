import { User } from 'src/modules/users/entities/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
} from 'typeorm';

export enum NotificationType {
  ORDER = 'ORDER',
  RESERVATION = 'RESERVATION',
  INVENTORY = 'INVENTORY',
  SYSTEM = 'SYSTEM',
}

@Entity()
export class Notification {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  message: string;

  @Column({ type: 'enum', enum: NotificationType })
  type: NotificationType;

  @Column({ nullable: true })
  relatedId: string; // ID of the related entity (order, inventory item, etc.)

  @Column({ default: false })
  isRead: boolean;

  @ManyToOne(() => User, (user) => user.notifications, { nullable: true })
  recipient: User;

  @CreateDateColumn()
  createdAt: Date;
}

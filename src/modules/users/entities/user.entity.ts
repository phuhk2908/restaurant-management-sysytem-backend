import { Notification } from 'src/modules/notifications/entities/notification.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToMany,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ type: 'enum', enum: ['admin', 'staff', 'chef'] })
  role: string;

  @CreateDateColumn()
  createdAt: Date;

  @OneToMany(() => Notification, (notification) => notification.recipient)
  notifications: Notification[];
}

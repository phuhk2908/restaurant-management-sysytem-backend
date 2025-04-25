import { OrderItem } from 'src/modules/order-items/entities/order-item.entity';
import { Table } from 'src/modules/tables/entities/table.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  tableId: number;

  @ManyToOne(() => Table, (table) => table.orders, { nullable: true })
  table: Table;

  @Column({ nullable: true })
  customerName: string; // for web orders

  @Column({ nullable: true })
  contactNumber: string;

  @Column({
    type: 'enum',
    enum: ['pending', 'preparing', 'ready', 'served', 'completed', 'cancelled'],
  })
  status: string;

  @Column({ type: 'enum', enum: ['dine-in', 'takeaway', 'delivery'] })
  type: string;

  @Column('decimal', { precision: 10, scale: 2 })
  totalAmount: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => OrderItem, (orderItem) => orderItem.order)
  items: OrderItem[];
}

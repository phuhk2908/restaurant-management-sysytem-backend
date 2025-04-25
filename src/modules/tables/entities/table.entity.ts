import { Order } from 'src/modules/orders/entities/order.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity()
export class Table {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  number: number;

  @Column({ unique: true })
  qrCode: string; // stores QR code identifier

  @Column({
    type: 'enum',
    enum: ['available', 'occupied', 'reserved', 'cleaning'],
  })
  status: string;

  @Column({ default: 2 })
  capacity: number;

  @OneToMany(() => Order, (order) => order.table)
  orders: Order[];
}

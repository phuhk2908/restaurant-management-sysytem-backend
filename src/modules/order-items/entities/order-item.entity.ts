import { FoodItem } from 'src/modules/food-items/entities/food-item.entity';
import { Order } from 'src/modules/orders/entities/order.entity';
import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from 'typeorm';

@Entity()
export class OrderItem {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Order, (order) => order.items)
  order: Order;

  @ManyToOne(() => FoodItem, (foodItem) => foodItem.orderItems)
  foodItem: FoodItem;

  @Column('int')
  quantity: number;

  @Column('decimal', { precision: 10, scale: 2 })
  priceAtOrder: number;

  @Column({ type: 'enum', enum: ['pending', 'preparing', 'ready', 'served'] })
  status: string;

  @Column({ nullable: true })
  specialRequest: string;
}

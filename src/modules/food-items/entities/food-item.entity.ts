import { OrderItem } from 'src/modules/order-items/entities/order-item.entity';
import { Recipe } from 'src/modules/recipes/entities/recipe.entity';
import {
  Column,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class FoodItem {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column('text')
  description: string;

  @Column('decimal', { precision: 10, scale: 2 })
  price: number;

  @Column()
  category: string; // e.g., appetizer, main course, dessert

  @Column({ default: true })
  isAvailable: boolean;

  @Column({ nullable: true })
  imageUrl: string;

  @OneToOne(() => Recipe, (recipe) => recipe.foodItem)
  recipe: Recipe;

  @OneToMany(() => OrderItem, (orderItem) => orderItem.foodItem)
  orderItems: OrderItem[];
}

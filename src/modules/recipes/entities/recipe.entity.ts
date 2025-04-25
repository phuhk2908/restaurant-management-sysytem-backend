import { FoodItem } from 'src/modules/food-items/entities/food-item.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
  Column,
  OneToMany,
} from 'typeorm';
import { RecipeMaterial } from './recipe-ingredient.entity';

@Entity()
export class Recipe {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => FoodItem, (foodItem) => foodItem.recipe)
  @JoinColumn()
  foodItem: FoodItem;

  @Column('text')
  instructions: string;

  @Column('int')
  preparationTime: number; // in minutes

  @OneToMany(() => RecipeMaterial, (recipeMaterial) => recipeMaterial.recipe)
  recipeMaterials: RecipeMaterial[];
}

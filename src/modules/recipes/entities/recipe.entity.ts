import { FoodItem } from 'src/modules/food-items/entities/food-item.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
  Column,
  OneToMany,
  Index,
} from 'typeorm';
import { RecipeIngredient } from './recipe-ingredient.entity';

@Entity()
export class Recipe {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => FoodItem, (foodItem) => foodItem.recipe, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  @Index()
  foodItem: FoodItem;

  @Column('text')
  instructions: string;

  @Column('int')
  preparationTime: number; // in minutes

  @OneToMany(
    () => RecipeIngredient,
    (recipeIngredient) => recipeIngredient.recipe,
    {
      onDelete: 'CASCADE',
    },
  )
  recipeIngredients: RecipeIngredient[];
}

import { Ingredient } from 'src/modules/ingredients/entities/ingredient.entity';
import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from 'typeorm';
import { Recipe } from './recipe.entity';

@Entity()
export class RecipeIngredient {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Recipe, (recipe) => recipe.recipeIngredients)
  recipe: Recipe;

  @ManyToOne(() => Ingredient, (ingredient) => ingredient.recipeIngredients)
  ingredient: Ingredient;

  @Column('decimal', { precision: 10, scale: 2 })
  quantity: number;
}

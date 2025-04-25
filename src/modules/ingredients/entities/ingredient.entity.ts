import { Inventory } from 'src/modules/inventories/entities/inventory.entity';
import { RecipeIngredient } from 'src/modules/recipes/entities/recipe-ingredient.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

export enum Unit {
  GRAM = 'g',
  KILOGRAM = 'kg',
  LITER = 'l',
  MILLILITER = 'ml',
  PEICES = 'pieces',
}

@Entity()
export class Ingredient {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ enum: Unit })
  unit: Unit;

  @Column({ nullable: true })
  category: string; // e.g., dairy, meat, vegetable, spice

  @OneToMany(
    () => RecipeIngredient,
    (recipeIngredient) => recipeIngredient.ingredient,
  )
  recipeIngredients: RecipeIngredient[];

  @OneToMany(() => Inventory, (inventory) => inventory.ingredient)
  inventories: Inventory[];
}

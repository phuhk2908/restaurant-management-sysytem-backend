import { Inventory } from 'src/modules/inventories/entities/inventory.entity';
import { RecipeIngredient } from 'src/modules/recipes/entities/recipe-ingredient.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity()
export class Ingredient {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    unit: string; // e.g., kg, g, l, ml, pieces

    @OneToMany(() => RecipeIngredient, (recipeIngredient) => recipeIngredient.material)
    recipeIngredients: RecipeIngredient[];

    @OneToMany(() => Inventory, (inventory) => inventory.material)
    inventories: Inventory[];
}

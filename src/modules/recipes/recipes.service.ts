import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Recipe } from './entities/recipe.entity';
import { Repository } from 'typeorm';
import { RecipeIngredient } from './entities/recipe-ingredient.entity';
import { Ingredient } from '../ingredients/entities/ingredient.entity';
import { CreateRecipeDto } from './dtos/create-recipe.dto';
import { AddIngredientToRecipeDto } from './dtos/add-ingredient-to-recipe.dto';

@Injectable()
export class RecipesService {
  constructor(
    @InjectRepository(Recipe)
    private readonly recipeRepository: Repository<Recipe>,
    @InjectRepository(RecipeIngredient)
    private readonly recipeIngredientRepository: Repository<RecipeIngredient>,
    @InjectRepository(Ingredient)
    private readonly ingredientRepository: Repository<Ingredient>,
  ) {}

  async createRecipe(createRecipeDto: CreateRecipeDto): Promise<Recipe> {
    const { ingredients, ...recipeData } = createRecipeDto;
    const recipe = this.recipeRepository.create(recipeData);
    await this.recipeRepository.save(recipe);

    for (const ingredient of ingredients) {
      await this.addIngredientToRecipe(recipe.id, {
        ingredientId: ingredient.ingredientId,
        quantity: ingredient.quantity,
      });
    }
    return recipe;
  }

  async addIngredientToRecipe(
    recipeId: string,
    addIngredientToRecipeDto: AddIngredientToRecipeDto,
  ): Promise<RecipeIngredient> {
    const recipe = await this.recipeRepository.findOne({
      where: { id: recipeId },
    });
    if (!recipe) {
      throw new Error('Recipe not found');
    }

    const ingredient = await this.ingredientRepository.findOne({
      where: { id: addIngredientToRecipeDto.ingredientId },
    });
    if (!ingredient) {
      throw new Error('Ingredient not found');
    }

    const recipeIngredient = this.recipeIngredientRepository.create({
      recipe,
      ingredient,
      quantity: addIngredientToRecipeDto.quantity,
    });

    return this.recipeIngredientRepository.save(recipeIngredient);
  }

  async getRecipeByFoodItem(foodItemId: string): Promise<Recipe | null> {
    return this.recipeRepository.findOne({
      where: {
        foodItem: {
          id: foodItemId,
        },
      },
      relations: ['recipeIngredients', 'recipeIngredients.ingredient'],
    });
  }

  async findAll(): Promise<Recipe[]> {
    return this.recipeRepository.find({
      relations: ['recipeIngredients', 'recipeIngredients.ingredient'],
    });
  }
}

import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { RecipesService } from './recipes.service';

import { CreateRecipeDto } from './dtos/create-recipe.dto';
import { AddIngredientToRecipeDto } from './dtos/add-ingredient-to-recipe.dto';

@Controller('recipes')
export class RecipesController {
  constructor(private readonly recipesService: RecipesService) {}

  @Post()
  create(@Body() createRecipeDto: CreateRecipeDto) {
    return this.recipesService.createRecipe(createRecipeDto);
  }

  @Post(':recipeId/ingredients')
  addIngredient(
    @Param('recipeId') recipeId: string,
    @Body() addIngredientToRecipeDto: AddIngredientToRecipeDto,
  ) {
    return this.recipesService.addIngredientToRecipe(
      recipeId,
      addIngredientToRecipeDto,
    );
  }

  @Get('food/:foodItemId')
  getRecipeByFoodItem(@Param('foodItemId') foodItemId: string) {
    return this.recipesService.getRecipeByFoodItem(foodItemId);
  }
}

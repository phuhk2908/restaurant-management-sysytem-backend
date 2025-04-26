import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiParam,
} from '@nestjs/swagger';
import { RecipesService } from './recipes.service';

import { CreateRecipeDto } from './dtos/create-recipe.dto';
import { AddIngredientToRecipeDto } from './dtos/add-ingredient-to-recipe.dto';

@ApiTags('recipes')
@Controller('recipes')
export class RecipesController {
  constructor(private readonly recipesService: RecipesService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new recipe' })
  @ApiBody({ type: CreateRecipeDto })
  @ApiResponse({ status: 201, description: 'Recipe created successfully.' })
  create(@Body() createRecipeDto: CreateRecipeDto) {
    return this.recipesService.createRecipe(createRecipeDto);
  }

  @Post(':recipeId/ingredients')
  @ApiOperation({ summary: 'Add an ingredient to a recipe' })
  @ApiParam({ name: 'recipeId', description: 'ID of the recipe' })
  @ApiBody({ type: AddIngredientToRecipeDto })
  @ApiResponse({ status: 200, description: 'Ingredient added to recipe.' })
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
  @ApiOperation({ summary: 'Get a recipe by food item ID' })
  @ApiParam({ name: 'foodItemId', description: 'ID of the food item' })
  @ApiResponse({ status: 200, description: 'Recipe details.' })
  getRecipeByFoodItem(@Param('foodItemId') foodItemId: string) {
    return this.recipesService.getRecipeByFoodItem(foodItemId);
  }
}

import { Module } from '@nestjs/common';
import { RecipesService } from './recipes.service';
import { Recipe } from './entities/recipe.entity';
import { RecipeIngredient } from './entities/recipe-ingredient.entity';
import { Ingredient } from '../ingredients/entities/ingredient.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RecipesController } from './recipes.controller';

@Module({
  providers: [RecipesService],
  imports: [TypeOrmModule.forFeature([Recipe, RecipeIngredient, Ingredient])],
  exports: [RecipesService],
  controllers: [RecipesController],
})
export class RecipesModule {}

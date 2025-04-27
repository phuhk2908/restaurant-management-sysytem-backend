import {
  IsArray,
  IsInt,
  IsObject,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { AddIngredientToRecipeDto } from './add-ingredient-to-recipe.dto';
import { Type } from 'class-transformer';
import { FoodItem } from 'src/modules/food-items/entities/food-item.entity';

export class CreateRecipeDto {
  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-426614174000',
    description: 'ID of the recipe',
    required: false,
  })
  @IsOptional()
  @IsString()
  id: string;

  @ApiProperty({
    example: '321e4567-e89b-12d3-a456-426614174000',
    description: 'ID of the food item',
  })
  @IsObject()
  foodItem: FoodItem;

  @ApiProperty({
    example: 'Mix ingredients and bake for 20 minutes.',
    description: 'Instructions for preparing the recipe',
  })
  @IsString()
  instructions: string;

  @ApiProperty({ example: 30, description: 'Preparation time in minutes' })
  @IsInt()
  preparationTime: number;

  @ApiProperty({
    example: ['123e4567-e89b-12d3-a456-426614174000'],
    description: 'IDs of recipe ingredients',
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => AddIngredientToRecipeDto)
  ingredients: AddIngredientToRecipeDto[];
}

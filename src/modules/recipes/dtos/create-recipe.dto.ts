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
    example: {
      id: '321e4567-e89b-12d3-a456-426614174000',
      name: 'Pizza',
      description: 'Delicious cheese pizza',
      price: 9.99,
      category: 'Main Course',
      isAvailable: true,
      imageUrl: 'https://example.com/image.jpg',
    },
    description: 'Food item object for the recipe',
    type: () => FoodItem,
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
    example: [
      {
        ingredientId: '123e4567-e89b-12d3-a456-426614174000',
        quantity: 100,
      },
      {
        ingredientId: '456e4567-e89b-12d3-a456-426614174111',
        quantity: 50,
      },
    ],
    description: 'List of ingredients for the recipe',
    type: [AddIngredientToRecipeDto],
    isArray: true,
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => AddIngredientToRecipeDto)
  ingredients: AddIngredientToRecipeDto[];
}

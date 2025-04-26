import { IsArray, IsInt, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

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
  @IsString()
  foodItemId: string;

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
  @IsString({ each: true })
  recipeIngredientIds: string[];
}

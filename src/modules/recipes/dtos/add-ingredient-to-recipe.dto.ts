import { IsString, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AddIngredientToRecipeDto {
  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-426614174000',
    description: 'ID of the ingredient',
  })
  @IsString()
  ingredientId: string;

  @ApiProperty({ example: 100, description: 'Quantity of the ingredient' })
  @IsNumber()
  quantity: number;
}

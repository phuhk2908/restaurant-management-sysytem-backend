import { Unit } from '../entities/ingredient.entity';
import { IsEnum, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateIngredientDto {
  @ApiProperty({ example: 'Tomato', description: 'Name of the ingredient' })
  @IsString()
  name: string;

  @ApiProperty({
    enum: Unit,
    example: Unit.GRAM,
    description: 'Unit of measurement',
  })
  @IsEnum(Unit)
  unit: Unit;

  @ApiProperty({
    example: 'Vegetable',
    description: 'Category of the ingredient',
    required: false,
  })
  @IsOptional()
  @IsString()
  category?: string;
}

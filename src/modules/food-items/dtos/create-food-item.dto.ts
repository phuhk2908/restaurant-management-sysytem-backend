import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsOptional, IsBoolean } from 'class-validator';

export class CreateFoodItemDto {
  @ApiProperty({ example: 'Pizza', description: 'Name of the food item' })
  @IsString()
  name: string;

  @ApiProperty({
    example: 'Delicious cheese pizza',
    description: 'Description of the food item',
  })
  @IsString()
  description: string;

  @ApiProperty({ example: 9.99, description: 'Price of the food item' })
  @IsNumber()
  price: number;

  @ApiProperty({
    example: 'Main Course',
    description: 'Category of the food item',
  })
  @IsString()
  category: string; // e.g., appetizer, main course, dessert

  @ApiProperty({
    example: true,
    description: 'Availability of the food item',
    required: false,
  })
  @IsOptional()
  @IsBoolean()
  isAvailable?: boolean;

  @ApiProperty({
    example: 'https://example.com/image.jpg',
    description: 'Image URL for the food item',
  })
  @IsString()
  @IsOptional()
  imageUrl: string;
}

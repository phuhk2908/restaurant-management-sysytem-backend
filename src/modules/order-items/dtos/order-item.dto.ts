import { IsString, IsInt, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class OrderItemDto {
  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-426614174000',
    description: 'ID of the food item',
  })
  @IsString()
  foodItemId: string;

  @ApiProperty({ example: 2, description: 'Quantity of the food item' })
  @IsInt()
  quantity: number;

  @ApiProperty({
    example: 'No onions',
    description: 'Special request for the item',
    required: false,
  })
  @IsOptional()
  @IsString()
  specialRequest?: string;
}

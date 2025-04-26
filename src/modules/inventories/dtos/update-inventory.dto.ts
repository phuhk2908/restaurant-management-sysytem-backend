import { IsNumber, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateInventoryDto {
  @ApiProperty({ example: 10, description: 'Current quantity in inventory' })
  @IsNumber()
  quantity: number;

  @ApiProperty({
    example: 2,
    description: 'Minimum required quantity',
    required: false,
  })
  @IsOptional()
  @IsNumber()
  minimumRequired?: number;
}

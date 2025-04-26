import { IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AdjustInventoryDto {
  @ApiProperty({ example: 5, description: 'Adjustment amount for inventory' })
  @IsNumber()
  adjustment: number;
}

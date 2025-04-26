import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateOrderItemStatusDto {
  @ApiProperty({
    example: 'PREPARING',
    description: 'Status of the order item',
  })
  @IsString()
  status: string;
}

import {
  IsEnum,
  IsOptional,
  IsString,
  ValidateNested,
  IsArray,
} from 'class-validator';
import { OrderStatus } from '../entities/order.entity';
import { OrderItemDto } from 'src/modules/order-items/dtos/order-item.dto';
import { ApiProperty } from '@nestjs/swagger';

export class CreateOrderDto {
  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-426614174000',
    description: 'ID of the table',
    required: false,
  })
  @IsOptional()
  @IsString()
  tableId?: string;

  @ApiProperty({
    example: 'John Doe',
    description: 'Name of the customer',
    required: false,
  })
  @IsOptional()
  @IsString()
  customerName?: string;

  @ApiProperty({
    example: '+123456789',
    description: 'Contact number of the customer',
    required: false,
  })
  @IsOptional()
  @IsString()
  contactNumber?: string;

  @ApiProperty({ example: 'DINE_IN', description: 'Type of order' })
  @IsString()
  type: string;

  @ApiProperty({
    enum: OrderStatus,
    example: OrderStatus.PENDING,
    description: 'Status of the order',
  })
  @IsEnum(OrderStatus)
  status: OrderStatus;

  @ApiProperty({ type: [OrderItemDto], description: 'List of order items' })
  @IsArray()
  @ValidateNested({ each: true })
  items: OrderItemDto[];
}

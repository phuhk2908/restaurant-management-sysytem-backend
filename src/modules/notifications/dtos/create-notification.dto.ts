import { NotificationType } from '../entities/notification.entity';
import { IsEnum, IsOptional, IsString, IsBoolean } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateNotificationDto {
  @ApiProperty({
    example: 'Inventory low',
    description: 'Notification message',
  })
  @IsString()
  message: string;

  @ApiProperty({
    enum: NotificationType,
    example: NotificationType.INVENTORY,
    description: 'Type of notification',
  })
  @IsEnum(NotificationType)
  type: NotificationType;

  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-426614174000',
    description: 'Related entity ID',
    required: false,
  })
  @IsOptional()
  @IsString()
  relatedId?: string;

  @ApiProperty({
    example: '789e0123-e89b-12d3-a456-426614174000',
    description: 'Recipient user ID',
    required: false,
  })
  @IsOptional()
  @IsString()
  recipientId?: string;

  @ApiProperty({
    example: false,
    description: 'Read status of the notification',
    required: false,
  })
  @IsOptional()
  @IsBoolean()
  isRead?: boolean;
}

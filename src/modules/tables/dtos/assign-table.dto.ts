import { IsString, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AssignTableDto {
  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-426614174000',
    description: 'ID of the table',
  })
  @IsString()
  tableId: string;

  @ApiProperty({
    example: '456e7890-e89b-12d3-a456-426614174000',
    description: 'ID of the reservation',
    required: false,
  })
  @IsOptional()
  @IsString()
  reservationId?: string;
}

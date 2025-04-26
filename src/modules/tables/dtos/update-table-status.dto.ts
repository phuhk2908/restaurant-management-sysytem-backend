import { TableStatus } from '../entities/table.entity';
import { IsEnum } from 'class-validator';

export class UpdateTableStatusDto {
  @IsEnum(TableStatus)
  status: TableStatus;
}

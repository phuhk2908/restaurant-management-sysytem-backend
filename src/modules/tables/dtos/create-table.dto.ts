import { IsEnum, IsInt, Min } from 'class-validator';
import { TableStatus } from '../entities/table.entity';

export class CreateTableDto {
  @IsInt()
  @Min(1)
  number: number;

  @IsInt()
  @Min(1)
  capacity: number;

  @IsEnum(TableStatus)
  status: TableStatus;
}

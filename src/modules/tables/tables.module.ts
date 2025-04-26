import { Module } from '@nestjs/common';
import { TablesService } from './tables.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Table } from './entities/table.entity';
import { TablesController } from './tables.controller';

@Module({
  providers: [TablesService],
  imports: [TypeOrmModule.forFeature([Table])],
  controllers: [TablesController],
})
export class TablesModule {}

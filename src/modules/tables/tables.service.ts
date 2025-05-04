import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTableDto } from './dtos/create-table.dto';
import { Table, TableStatus } from './entities/table.entity';
import { AssignTableDto } from './dtos/assign-table.dto';

@Injectable()
export class TablesService {
  constructor(
    @InjectRepository(Table)
    private tableRepository: Repository<Table>,
  ) {}

  async createTable(createTableDto: CreateTableDto): Promise<Table> {
    const table = this.tableRepository.create(createTableDto);
    table.qrCode = `table-${createTableDto.number}-${Date.now()}`;
    return this.tableRepository.save(table);
  }

  async findAll(): Promise<Table[]> {
    return this.tableRepository.find();
  }

  async findById(id: string): Promise<Table | null> {
    return this.tableRepository.findOne({ where: { id } });
  }

  async findAvailableTables(): Promise<Table[]> {
    return this.tableRepository.find({
      where: { status: TableStatus.AVAILABLE },
    });
  }

  async updateTableStatus(id: string, status: TableStatus): Promise<Table> {
    const table = await this.tableRepository.findOne({ where: { id } });
    if (!table) {
      throw new NotFoundException(`Table with ID ${id} not found`);
    }

    table.status = status;
    return this.tableRepository.save(table);
  }

  async getTableByQR(qrCode: string): Promise<Table | null> {
    return this.tableRepository.findOne({ where: { qrCode } });
  }

  async assignTable(
    id: string,
    assignTableDto: AssignTableDto,
  ): Promise<Table> {
    const table = await this.tableRepository.findOne({ where: { id } });
    if (!table) {
      throw new NotFoundException(`Table with ID ${id} not found`);
    }
    // Example assignment logic: just attach reservationId to table entity
    if (assignTableDto.reservationId) {
      table.reservationId = assignTableDto.reservationId;
    }
    return this.tableRepository.save(table);
  }
}

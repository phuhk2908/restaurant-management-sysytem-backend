import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiParam,
} from '@nestjs/swagger';
import { CreateTableDto } from './dtos/create-table.dto';
import { TablesService } from './tables.service';
import { UpdateTableStatusDto } from './dtos/update-table-status.dto';
import { AssignTableDto } from './dtos/assign-table.dto';

@ApiTags('tables')
@Controller('tables')
export class TablesController {
  constructor(private readonly tablesService: TablesService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new table' })
  @ApiBody({ type: CreateTableDto })
  @ApiResponse({ status: 201, description: 'Table created successfully.' })
  create(@Body() createTableDto: CreateTableDto) {
    return this.tablesService.createTable(createTableDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all tables' })
  @ApiResponse({ status: 200, description: 'List of all tables.' })
  findAll() {
    return this.tablesService.findAll();
  }

  @Get('available')
  @ApiOperation({ summary: 'Get all available tables' })
  @ApiResponse({ status: 200, description: 'List of available tables.' })
  findAvailable() {
    return this.tablesService.findAvailableTables();
  }

  @Patch(':id/status')
  @ApiOperation({ summary: 'Update table status' })
  @ApiParam({ name: 'id', description: 'ID of the table' })
  @ApiBody({ type: UpdateTableStatusDto })
  @ApiResponse({ status: 200, description: 'Table status updated.' })
  updateStatus(
    @Param('id') id: string,
    @Body() updateTableStatusDto: UpdateTableStatusDto,
  ) {
    return this.tablesService.updateTableStatus(
      id,
      updateTableStatusDto.status,
    );
  }

  @Patch(':id/assign')
  @ApiOperation({ summary: 'Assign a reservation to a table' })
  @ApiParam({ name: 'id', description: 'ID of the table' })
  @ApiBody({ type: AssignTableDto })
  @ApiResponse({ status: 200, description: 'Table assigned to reservation.' })
  assignTable(@Param('id') id: string, @Body() assignTableDto: AssignTableDto) {
    return this.tablesService.assignTable(id, assignTableDto);
  }
}

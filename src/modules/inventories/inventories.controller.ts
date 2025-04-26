import { Body, Controller, Get, Param, Patch } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiParam,
} from '@nestjs/swagger';
import { InventoriesService } from './inventories.service';
import { UpdateInventoryDto } from './dtos/update-inventory.dto';

@ApiTags('inventories')
@Controller('inventories')
export class InventoriesController {
  constructor(private readonly inventoriesService: InventoriesService) {}

  @Get()
  @ApiOperation({ summary: 'Get all inventory items' })
  @ApiResponse({ status: 200, description: 'List of all inventory items.' })
  findAll() {
    return this.inventoriesService.getAllInventory();
  }

  @Get('low-stock')
  @ApiOperation({ summary: 'Get all low-stock inventory items' })
  @ApiResponse({
    status: 200,
    description: 'List of low stock inventory items.',
  })
  findLowStock() {
    return this.inventoriesService.getLowStockItems();
  }

  @Patch(':materialId')
  @ApiOperation({ summary: 'Update inventory quantity' })
  @ApiParam({ name: 'materialId', description: 'ID of the material' })
  @ApiBody({ type: UpdateInventoryDto })
  @ApiResponse({ status: 200, description: 'Inventory updated.' })
  update(
    @Param('materialId') materialId: string,
    @Body() updateInventoryDto: UpdateInventoryDto,
  ) {
    return this.inventoriesService.updateInventory(
      materialId,
      updateInventoryDto.quantity,
    );
  }
}

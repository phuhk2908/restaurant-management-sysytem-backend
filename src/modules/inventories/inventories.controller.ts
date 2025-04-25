import { Body, Controller, Get, Param, Patch } from '@nestjs/common';
import { InventoriesService } from './inventories.service';
import { UpdateInventoryDto } from './dtos/update-inventory.dto';

@Controller('inventories')
export class InventoriesController {
  constructor(private readonly inventoriesService: InventoriesService) {}

  @Get()
  findAll() {
    return this.inventoriesService.getAllInventory();
  }

  @Get('low-stock')
  findLowStock() {
    return this.inventoriesService.getLowStockItems();
  }

  @Patch(':materialId')
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

import { Module } from '@nestjs/common';
import { InventoriesService } from './inventories.service';
import { InventoriesController } from './inventories.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Inventory } from './entities/inventory.entity';
import { Ingredient } from '../ingredients/entities/ingredient.entity';

@Module({
  providers: [InventoriesService],
  controllers: [InventoriesController],
  imports: [TypeOrmModule.forFeature([Inventory, Ingredient])],
  exports: [InventoriesService],
})
export class InventoriesModule {}

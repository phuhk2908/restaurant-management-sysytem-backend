import { Module } from '@nestjs/common';
import { InventoriesService } from './inventories.service';

@Module({
  providers: [InventoriesService],
})
export class InventoriesModule {}

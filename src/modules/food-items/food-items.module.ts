import { Module } from '@nestjs/common';
import { FoodItemsService } from './food-items.service';

@Module({
  providers: [FoodItemsService]
})
export class FoodItemsModule {}

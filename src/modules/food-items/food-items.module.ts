import { Module } from '@nestjs/common';
import { FoodItemsService } from './food-items.service';
import { FoodItem } from './entities/food-item.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FoodItemsController } from './food-items.controller';

@Module({
  providers: [FoodItemsService],
  imports: [TypeOrmModule.forFeature([FoodItem])],
  exports: [FoodItemsService],
  controllers: [FoodItemsController],
})
export class FoodItemsModule {}

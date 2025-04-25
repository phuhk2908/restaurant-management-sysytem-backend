import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { FoodItemsService } from './food-items.service';
import { CreateFoodItemDto } from './dtos/create-food-item.dto';
import { UpdateFoodItemDto } from './dtos/update-food-item.dto';

@Controller('food-items')
export class FoodItemsController {
  constructor(private readonly foodItemsService: FoodItemsService) {}

  @Post()
  create(@Body() createFoodDto: CreateFoodItemDto) {
    return this.foodItemsService.createFoodItem(createFoodDto);
  }

  @Get()
  findAll() {
    return this.foodItemsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.foodItemsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFoodDto: UpdateFoodItemDto) {
    return this.foodItemsService.update(id, updateFoodDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.foodItemsService.remove(id);
  }

  @Patch(':id/toggle-availability')
  toggleAvailability(@Param('id') id: string) {
    return this.foodItemsService.toggleAvailability(id);
  }
}

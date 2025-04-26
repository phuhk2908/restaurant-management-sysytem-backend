import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiParam,
} from '@nestjs/swagger';
import { FoodItemsService } from './food-items.service';
import { CreateFoodItemDto } from './dtos/create-food-item.dto';
import { UpdateFoodItemDto } from './dtos/update-food-item.dto';

@ApiTags('food-items')
@Controller('food-items')
export class FoodItemsController {
  constructor(private readonly foodItemsService: FoodItemsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new food item' })
  @ApiBody({ type: CreateFoodItemDto })
  @ApiResponse({ status: 201, description: 'Food item created successfully.' })
  create(@Body() createFoodDto: CreateFoodItemDto) {
    return this.foodItemsService.createFoodItem(createFoodDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all food items' })
  @ApiResponse({ status: 200, description: 'List of all food items.' })
  findAll() {
    return this.foodItemsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a food item by ID' })
  @ApiParam({ name: 'id', description: 'ID of the food item' })
  @ApiResponse({ status: 200, description: 'Food item details.' })
  findOne(@Param('id') id: string) {
    return this.foodItemsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a food item' })
  @ApiParam({ name: 'id', description: 'ID of the food item' })
  @ApiBody({ type: UpdateFoodItemDto })
  @ApiResponse({ status: 200, description: 'Food item updated.' })
  update(@Param('id') id: string, @Body() updateFoodDto: UpdateFoodItemDto) {
    return this.foodItemsService.update(id, updateFoodDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a food item' })
  @ApiParam({ name: 'id', description: 'ID of the food item' })
  @ApiResponse({ status: 200, description: 'Food item deleted.' })
  remove(@Param('id') id: string) {
    return this.foodItemsService.remove(id);
  }

  @Patch(':id/toggle-availability')
  @ApiOperation({ summary: 'Toggle availability of a food item' })
  @ApiParam({ name: 'id', description: 'ID of the food item' })
  @ApiResponse({ status: 200, description: 'Food item availability toggled.' })
  toggleAvailability(@Param('id') id: string) {
    return this.foodItemsService.toggleAvailability(id);
  }
}

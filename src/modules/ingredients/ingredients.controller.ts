import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateIngredientDto } from './dtos/create-ingredient.dto';
import { UpdateIngredientDto } from './dtos/update-ingredient.dto';
import { IngredientsService } from './ingredients.service';

@Controller('ingredients')
export class IngredientsController {
  constructor(private readonly ingredientsService: IngredientsService) {}

  @Post()
  create(@Body() createIngredientDto: CreateIngredientDto) {
    return this.ingredientsService.create(createIngredientDto);
  }

  @Get()
  findAll() {
    return this.ingredientsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ingredientsService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateIngredientDto: UpdateIngredientDto,
  ) {
    return this.ingredientsService.update(+id, updateIngredientDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ingredientsService.remove(+id);
  }

  @Get('search/:name')
  searchByName(@Param('name') name: string) {
    return this.ingredientsService.searchByName(name);
  }
}

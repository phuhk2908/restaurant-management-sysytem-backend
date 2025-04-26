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
import { CreateIngredientDto } from './dtos/create-ingredient.dto';
import { UpdateIngredientDto } from './dtos/update-ingredient.dto';
import { IngredientsService } from './ingredients.service';

@ApiTags('ingredients')
@Controller('ingredients')
export class IngredientsController {
  constructor(private readonly ingredientsService: IngredientsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new ingredient' })
  @ApiBody({ type: CreateIngredientDto })
  @ApiResponse({ status: 201, description: 'Ingredient created successfully.' })
  create(@Body() createIngredientDto: CreateIngredientDto) {
    return this.ingredientsService.create(createIngredientDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all ingredients' })
  @ApiResponse({ status: 200, description: 'List of all ingredients.' })
  findAll() {
    return this.ingredientsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get an ingredient by ID' })
  @ApiParam({ name: 'id', description: 'ID of the ingredient' })
  @ApiResponse({ status: 200, description: 'Ingredient details.' })
  findOne(@Param('id') id: string) {
    return this.ingredientsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update an ingredient' })
  @ApiParam({ name: 'id', description: 'ID of the ingredient' })
  @ApiBody({ type: UpdateIngredientDto })
  @ApiResponse({ status: 200, description: 'Ingredient updated.' })
  update(
    @Param('id') id: string,
    @Body() updateIngredientDto: UpdateIngredientDto,
  ) {
    return this.ingredientsService.update(id, updateIngredientDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete an ingredient' })
  @ApiParam({ name: 'id', description: 'ID of the ingredient' })
  @ApiResponse({ status: 200, description: 'Ingredient deleted.' })
  remove(@Param('id') id: string) {
    return this.ingredientsService.remove(id);
  }

  @Get('search/:name')
  @ApiOperation({ summary: 'Search for ingredients by name' })
  @ApiParam({ name: 'name', description: 'Name of the ingredient' })
  @ApiResponse({
    status: 200,
    description: 'List of ingredients matching the name.',
  })
  searchByName(@Param('name') name: string) {
    return this.ingredientsService.searchByName(name);
  }
}

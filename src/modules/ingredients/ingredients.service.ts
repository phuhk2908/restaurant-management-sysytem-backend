import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Inventory } from '../inventories/entities/inventory.entity';
import { Ingredient } from './entities/ingredient.entity';
import { CreateIngredientDto } from './dtos/create-ingredient.dto';
import { UpdateIngredientDto } from './dtos/update-ingredient.dto';

@Injectable()
export class IngredientsService {
  constructor(
    @InjectRepository(Ingredient)
    private ingredientRepository: Repository<Ingredient>,
    @InjectRepository(Inventory)
    private inventoryRepository: Repository<Inventory>,
  ) { }

  async create(createIngredientDto: CreateIngredientDto): Promise<Ingredient> {
    const { initialQuantity, ...ingredientData } = createIngredientDto
    const ingredient = this.ingredientRepository.create(ingredientData);
    const savedIngredient = await this.ingredientRepository.save(ingredient);

    await this.inventoryRepository.save({
      ingredient: savedIngredient,
      quantity: initialQuantity || 0,
      lastUpdated: new Date(),
    });

    return savedIngredient;
  }

  async findAll(): Promise<Ingredient[]> {
    return this.ingredientRepository.find({
      relations: ['inventories'],
    });
  }

  async findOne(id: string): Promise<Ingredient | null> {
    return this.ingredientRepository.findOne({
      where: { id: id },
      relations: [
        'inventories',
        'recipeIngredients',
        'recipeIngredients.recipe',
      ],
    });
  }

  async update(
    id: string,
    updateIngredientDto: UpdateIngredientDto,
  ): Promise<Ingredient | null> {
    await this.ingredientRepository.update(id, updateIngredientDto);
    return this.ingredientRepository.findOne({ where: { id } });
  }

  async remove(id: string): Promise<any> {
    // Check if ingredient is used in any recipes
    const ingredient = await this.ingredientRepository.findOne({
      where: { id },
      relations: ['recipeIngredients'],
    });

    if (!ingredient) {
      throw new NotFoundException('Ingredient not found');
    }

    if (ingredient.recipeIngredients.length > 0) {
      throw new BadRequestException('Cannot delete ingredient used in recipes');
    }

    await this.ingredientRepository.delete(id);

    return { message: 'Ingredient deleted successfully' };
  }

  async searchByName(name: string): Promise<Ingredient[]> {
    return this.ingredientRepository
      .createQueryBuilder('ingredient')
      .where('LOWER(ingredient.name) LIKE LOWER(:name)', { name: `%${name}%` })
      .getMany();
  }
}

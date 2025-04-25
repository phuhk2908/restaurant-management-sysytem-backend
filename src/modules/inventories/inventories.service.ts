import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Ingredient } from '../ingredients/entities/ingredient.entity';
import { Inventory } from './entities/inventory.entity';

@Injectable()
export class InventoriesService {
  constructor(
    @InjectRepository(Inventory)
    private inventoryRepository: Repository<Inventory>,
    @InjectRepository(Ingredient)
    private ingredientRepository: Repository<Ingredient>,
  ) {}

  async updateInventory(
    ingredientId: string,
    quantity: number,
  ): Promise<Inventory> {
    let inventory = await this.inventoryRepository.findOne({
      where: { ingredient: { id: +ingredientId } },
    });

    if (!inventory) {
      const ingredient = await this.ingredientRepository.findOne({
        where: { id: +ingredientId },
      });

      if (!ingredient) {
        throw new NotFoundException('Ingredient not found');
      }

      inventory = this.inventoryRepository.create({ ingredient, quantity });
    } else {
      inventory.quantity = quantity;
    }

    inventory.lastUpdated = new Date();

    if (
      inventory.minimumRequired &&
      inventory.quantity < inventory.minimumRequired
    ) {
      inventory.lowStock = true;
    } else {
      inventory.lowStock = false;
    }

    return this.inventoryRepository.save(inventory);
  }

  async getLowStockItems(): Promise<Inventory[]> {
    return this.inventoryRepository.find({
      where: { lowStock: true },
      relations: ['ingredient'],
    });
  }

  async getAllInventory(): Promise<Inventory[]> {
    return this.inventoryRepository.find({ relations: ['ingredient'] });
  }
}

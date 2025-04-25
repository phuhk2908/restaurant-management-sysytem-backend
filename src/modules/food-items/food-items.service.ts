import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FoodItem } from './entities/food-item.entity';
import { DeleteResult, Repository } from 'typeorm';
import { CreateFoodItemDto } from './dtos/create-food-item.dto';
import { UpdateFoodItemDto } from './dtos/update-food-item.dto';

@Injectable()
export class FoodItemsService {
    constructor(@InjectRepository(FoodItem) private readonly foodItemsRepository: Repository<FoodItem>) { }

    async createFoodItem(createFoodItemDto: CreateFoodItemDto): Promise<FoodItem> {
        const foodItem = this.foodItemsRepository.create(createFoodItemDto)
        return this.foodItemsRepository.save(foodItem)
    }

    async findAll(): Promise<FoodItem[]> {
        return this.foodItemsRepository.find({ relations: ["recipe"] })
    }

    async findOne(id: string): Promise<FoodItem | null> {
        return this.foodItemsRepository.findOne({ where: { id }, relations: ['recipe'] });
    }

    async update(id: string, updateFoodItemDto: UpdateFoodItemDto): Promise<FoodItem | null> {
        await this.foodItemsRepository.update(id, updateFoodItemDto);
        return this.foodItemsRepository.findOne({ where: { id }, relations: ['recipe'] });
    }

    async remove(id: string): Promise<DeleteResult> {
        return this.foodItemsRepository.delete(id)
    }

    async toggleAvailability(id: string): Promise<FoodItem> {
        const foodItem = await this.foodItemsRepository.findOne({ where: { id } })

        if (!foodItem) {
            throw new NotFoundException(`Food not found`);
        }

        foodItem.isAvailable = !foodItem.isAvailable;
        return this.foodItemsRepository.save(foodItem);
    }
}


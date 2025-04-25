import { Module } from '@nestjs/common';
import { IngredientsService } from './ingredients.service';
import { IngredientsController } from './ingredients.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ingredient } from './entities/ingredient.entity';
import { Inventory } from '../inventories/entities/inventory.entity';

@Module({
  providers: [IngredientsService],
  controllers: [IngredientsController],
  imports: [TypeOrmModule.forFeature([Ingredient, Inventory])],
  exports: [IngredientsService],
})
export class IngredientsModule {}

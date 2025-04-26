import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { OrderItem } from '../order-items/entities/order-item.entity';
import { Table } from '../tables/entities/table.entity';
import { FoodItem } from '../food-items/entities/food-item.entity';

import { InventoriesModule } from '../inventories/inventories.module';
import { RecipesModule } from '../recipes/recipes.module';
import { NotificationsModule } from '../notifications/notifications.module';
import { OrdersController } from './orders.controller';

@Module({
  providers: [OrdersService],
  imports: [
    TypeOrmModule.forFeature([Order, OrderItem, Table, FoodItem]),
    InventoriesModule,
    NotificationsModule,
    RecipesModule,
  ],
  exports: [OrdersService],
  controllers: [OrdersController],
})
export class OrdersModule {}

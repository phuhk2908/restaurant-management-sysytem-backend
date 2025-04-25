import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './modules/users/users.module';
import { FoodItemsModule } from './modules/food-items/food-items.module';
import { RecipesModule } from './modules/recipes/recipes.module';
import { IngredientsModule } from './modules/ingredients/ingredients.module';
import { InventoriesModule } from './modules/inventories/inventories.module';
import { OrdersModule } from './modules/orders/orders.module';
import { TablesModule } from './modules/tables/tables.module';
import { OrderItemsModule } from './modules/order-items/order-items.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/database.config';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    UsersModule,
    FoodItemsModule,
    RecipesModule,
    IngredientsModule,
    InventoriesModule,
    OrdersModule,
    TablesModule,
    OrderItemsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

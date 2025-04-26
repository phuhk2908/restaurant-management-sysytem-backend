import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Not, Repository } from 'typeorm';
import { Order, OrderStatus } from './entities/order.entity';
import { OrderItem } from '../order-items/entities/order-item.entity';
import { FoodItem } from '../food-items/entities/food-item.entity';
import { Table, TableStatus } from '../tables/entities/table.entity';
import { InventoriesService } from '../inventories/inventories.service';
import { RecipesService } from '../recipes/recipes.service';
import { CreateOrderDto } from './dtos/create-order.dto';
import { NotificationsService } from '../notifications/notifications.service';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    @InjectRepository(OrderItem)
    private readonly orderItemRepository: Repository<OrderItem>,
    @InjectRepository(FoodItem)
    private readonly foodItemRepository: Repository<FoodItem>,
    @InjectRepository(Table)
    private readonly tableRepository: Repository<Table>,
    private inventoriesService: InventoriesService,
    private recipesService: RecipesService,
    private notificationsService: NotificationsService,
  ) {}

  async createOrder(createOrderDto: CreateOrderDto): Promise<Order> {
    const order = this.orderRepository.create(createOrderDto);
    let totalAmount = 0;
    const orderItems: OrderItem[] = [];

    // Process each item in the order
    for (const item of createOrderDto.items) {
      const foodItem = await this.foodItemRepository.findOne({
        where: { id: item.foodItemId },
      });

      if (!foodItem || !foodItem.isAvailable) {
        throw new NotFoundException(
          `Food item with ID ${item.foodItemId} not available`,
        );
      }

      const recipe = await this.recipesService.getRecipeByFoodItem(foodItem.id);

      if (!recipe) {
        throw new NotFoundException(`Recipe with ID ${foodItem.id} not found`);
      }

      for (const recipeIngredient of recipe.recipeIngredients) {
        const inventory =
          await this.inventoriesService.getInventoryByIngredient(
            recipeIngredient.ingredient.id,
          );
        const requiredQuantity = recipeIngredient.quantity * item.quantity;

        if (inventory.quantity < requiredQuantity) {
          throw new BadRequestException(
            `Not enough ${recipeIngredient.ingredient.name} in inventory`,
          );
        }
      }

      // Deduct from inventory (in a real system, this would be in a transaction)
      for (const recipeIngredient of recipe.recipeIngredients) {
        const requiredQuantity = recipeIngredient.quantity * item.quantity;
        await this.inventoriesService.adjustInventory(
          recipeIngredient.ingredient.id,
          -requiredQuantity,
        );
      }

      const orderItem = this.orderItemRepository.create({
        foodItem,
        quantity: item.quantity,
        priceAtOrder: foodItem.price,
        specialRequest: item.specialRequest,
      });

      orderItems.push(orderItem);
      totalAmount += foodItem.price * item.quantity;
    }

    order.totalAmount = totalAmount;
    order.items = orderItems;

    if (createOrderDto.tableId) {
      const table = await this.tableRepository.findOne({
        where: { id: createOrderDto.tableId },
      });
      if (!table) {
        throw new NotFoundException(
          `Table with ID ${createOrderDto.tableId} not found`,
        );
      }
      table.status = TableStatus.OCCUPIED;
      await this.tableRepository.save(table);
      order.table = table;
    }

    const savedOrder = await this.orderRepository.save(order);

    // Notify kitchen/staff
    await this.notificationsService.notifyNewOrder(savedOrder);

    return savedOrder;
  }

  async updateOrderStatus(id: string, status: OrderStatus): Promise<Order> {
    const order = await this.orderRepository.findOne({ where: { id } });
    if (!order) {
      throw new NotFoundException(`Order with ID ${id} not found`);
    }

    order.status = status;
    return this.orderRepository.save(order);
  }

  async getOrdersByStatus(status: OrderStatus): Promise<Order[]> {
    return this.orderRepository.find({
      where: { status },
      relations: ['items', 'items.foodItem'],
    });
  }

  async getTableOrders(tableId: string): Promise<Order[]> {
    return this.orderRepository.find({
      where: { table: { id: tableId }, status: Not(OrderStatus.COMPLETED) },
      relations: ['items', 'items.foodItem'],
    });
  }

  async findAll(): Promise<Order[]> {
    return this.orderRepository.find({
      relations: ['items', 'items.foodItem'],
    });
  }

  async findOne(id: string): Promise<Order | null> {
    return this.orderRepository.findOne({
      where: { id },
      relations: ['items', 'items.foodItem'],
    });
  }
}

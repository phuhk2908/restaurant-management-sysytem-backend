import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiParam,
  ApiQuery,
} from '@nestjs/swagger';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dtos/create-order.dto';
import { OrderStatus } from './entities/order.entity';
import { UpdateOrderStatusDto } from './dtos/update-order-status.dto';

@ApiTags('orders')
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new order' })
  @ApiBody({ type: CreateOrderDto })
  @ApiResponse({ status: 201, description: 'Order created successfully.' })
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.ordersService.createOrder(createOrderDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all orders or filter by status' })
  @ApiQuery({
    name: 'status',
    required: false,
    enum: OrderStatus,
    description: 'Order status to filter by',
  })
  @ApiResponse({ status: 200, description: 'List of orders.' })
  findAll(@Query('status') status?: OrderStatus) {
    if (status) {
      return this.ordersService.getOrdersByStatus(status);
    }
    return this.ordersService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get an order by ID' })
  @ApiParam({ name: 'id', description: 'ID of the order' })
  @ApiResponse({ status: 200, description: 'Order details.' })
  findOne(@Param('id') id: string) {
    return this.ordersService.findOne(id);
  }

  @Get('table/:tableId')
  @ApiOperation({ summary: 'Get all orders for a table' })
  @ApiParam({ name: 'tableId', description: 'ID of the table' })
  @ApiResponse({ status: 200, description: 'List of table orders.' })
  findTableOrders(@Param('tableId') tableId: string) {
    return this.ordersService.getTableOrders(tableId);
  }

  @Patch(':id/status')
  @ApiOperation({ summary: 'Update order status' })
  @ApiParam({ name: 'id', description: 'ID of the order' })
  @ApiBody({ type: UpdateOrderStatusDto })
  @ApiResponse({ status: 200, description: 'Order status updated.' })
  updateStatus(
    @Param('id') id: string,
    @Body() updateOrderStatusDto: UpdateOrderStatusDto,
  ) {
    return this.ordersService.updateOrderStatus(
      id,
      updateOrderStatusDto.status,
    );
  }
}

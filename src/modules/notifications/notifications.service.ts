import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import {
  Notification,
  NotificationType,
} from '../notifications/entities/notification.entity';
import { CreateNotificationDto } from './dtos/create-notification.dto';
import { Order } from '../orders/entities/order.entity';

@Injectable()
export class NotificationsService {
  constructor(
    @InjectRepository(Notification)
    private notificationRepository: Repository<Notification>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async createNotification(
    createNotificationDto: CreateNotificationDto,
  ): Promise<Notification> {
    const notification = this.notificationRepository.create(
      createNotificationDto,
    );

    if (createNotificationDto.recipientId) {
      const recipient = await this.userRepository.findOne({
        where: { id: createNotificationDto.recipientId },
      });

      if (!recipient) {
        throw new NotFoundException('Recipient not found');
      }
      notification.recipient = recipient;
    }

    return this.notificationRepository.save(notification);
  }

  async getUserNotifications(userId: string): Promise<Notification[]> {
    return this.notificationRepository.find({
      where: { recipient: { id: userId } },
      order: { createdAt: 'DESC' },
    });
  }

  async markAsRead(id: string): Promise<Notification | null> {
    await this.notificationRepository.update(id, { isRead: true });
    return this.notificationRepository.findOne({ where: { id } });
  }

  async getUnreadCount(userId: string): Promise<number> {
    return this.notificationRepository.count({
      where: {
        recipient: { id: userId },
        isRead: false,
      },
    });
  }

  async notifyNewOrder(order: Order): Promise<void> {
    // Notify all staff/chefs
    const staff = await this.userRepository.find({
      where: { role: In(['chef', 'staff']) },
    });

    for (const user of staff) {
      await this.createNotification({
        message: `New order #${order.id} received`,
        type: NotificationType.ORDER,
        relatedId: order.id,
        recipientId: user.id,
      });
    }
  }
}

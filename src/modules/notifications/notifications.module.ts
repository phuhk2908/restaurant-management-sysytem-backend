import { Module } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Notification } from './entities/notification.entity';
import { User } from '../users/entities/user.entity';
import { NotificationsController } from './notifications.controller';

@Module({
  providers: [NotificationsService],
  imports: [TypeOrmModule.forFeature([Notification, User])],
  controllers: [NotificationsController],
  exports: [NotificationsService],
})
export class NotificationsModule {}

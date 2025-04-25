import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  url:
    process.env.DATABASE_URL ||
    'postgresql://restaurant_owner:npg_u79XxpVEFQmq@ep-restless-rice-a82yt6uh-pooler.eastus2.azure.neon.tech/restaurant?sslmode=require',
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
  synchronize: process.env.NODE_ENV !== 'production',
  logging: process.env.NODE_ENV === 'development',
  extra: {
    ssl:
      process.env.NODE_ENV === 'production'
        ? { rejectUnauthorized: false }
        : false,
  },
};

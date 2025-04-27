import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';

export const typeOrmConfig: TypeOrmModuleAsyncOptions = {
  imports: [ConfigModule],
  useFactory: (config: ConfigService) => ({
    type: 'postgres',
    url: config.get('DATABASE_URL'),
    entities: [__dirname + '/../**/*.entity.{js,ts}'],
    synchronize: config.get('NODE_ENV') !== 'production',
    logging: config.get('NODE_ENV') === 'development',
    extra: {
      ssl:
        config.get('NODE_ENV') === 'production'
          ? { rejectUnauthorized: false }
          : false,
    },
  }),
  inject: [ConfigService],
};

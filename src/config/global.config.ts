import { TypeOrmModuleOptions } from '@nestjs/typeorm';

interface GlobalConfig {
  port: string | number;
  url: string;
  jwtSecret: string;
  redisUri: string;
  database: TypeOrmModuleOptions;
}

export const globalConfig = (): GlobalConfig => ({
  url: process.env.NODE_ENV === 'production' ? 'https://sales-management-api.herokuapp.com' : 'http://localhost:3000',
  port: process.env.PORT || 3000,
  jwtSecret: process.env.JWT_SECRET,
  redisUri: process.env.REDIS_URI || 'redis://localhost:6379',
  database: {
    type: 'postgres',
    url: process.env.DATABASE_URL,
    logging: false,
    synchronize: true,
    autoLoadEntities: true,
    dropSchema: process.env.NODE_ENV !== 'production',
  },
});

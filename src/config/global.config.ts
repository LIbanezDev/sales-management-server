import { TypeOrmModuleOptions } from '@nestjs/typeorm';

interface GlobalConfig {
  port: string | number;
  url: string;
  jwtSecret: string;
  database: TypeOrmModuleOptions;
}

export const globalConfig = (): GlobalConfig => ({
  url: process.env.NODE_ENV === 'production' ? 'https://nest-deploy-lv.herokuapp.com' : 'http://localhost:3000',
  port: process.env.PORT || 3000,
  jwtSecret: process.env.JWT_SECRET,
  database: {
    type: 'postgres',
    url: process.env.DATABASE_URL,
    logging: false,
    synchronize: true,
    autoLoadEntities: true,
  },
});

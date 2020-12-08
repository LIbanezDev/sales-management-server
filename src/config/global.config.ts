import { TypeOrmModuleOptions } from '@nestjs/typeorm';

interface GlobalConfig {
  port: string | number,
  jwtSecret: string;
  database: TypeOrmModuleOptions;
}

export const globalConfig = (): GlobalConfig => ({
  port: process.env.PORT || 3000,
  jwtSecret: process.env.JWT_SECRET,
  database: {
    type: 'postgres',
    url: process.env.DATABASE_URL,
    logging: false,
    synchronize: true,
    autoLoadEntities: true,
    dropSchema: true,
  },
});

import { TypeOrmModuleOptions } from '@nestjs/typeorm';

interface GlobalConfig {
  jwtSecret: string;
  database: TypeOrmModuleOptions;
}

export const globalConfig = (): GlobalConfig => ({
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

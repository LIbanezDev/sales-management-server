import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { MicroController } from './micro.controller';
import { MicroService } from './micro.service';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'HELLO_SERVICE',
        transport: Transport.REDIS,
        options: {
          url: process.env.REDIS_URI || 'redis://localhost:6379',
        },
      },
    ]),
  ],
  controllers: [MicroController],
  providers: [MicroService],
})
export class MicroModule {}

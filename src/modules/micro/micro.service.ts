import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class MicroService {
  constructor(@Inject('HELLO_SERVICE') private client: ClientProxy) {}

  async sayHello() {
    return this.client.emit('saludando', 'Lucas!');
  }
}

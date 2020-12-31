import { Controller, Get } from '@nestjs/common';
import { MicroService } from './micro.service';

@Controller('micro')
export class MicroController {
  constructor(private readonly microService: MicroService) {}

  @Get()
  async hello() {
    return this.microService.sayHello();
  }
}

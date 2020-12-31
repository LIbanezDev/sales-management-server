import { Test, TestingModule } from '@nestjs/testing';
import { MicroController } from './micro.controller';

describe('MicroController', () => {
  let controller: MicroController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MicroController],
    }).compile();

    controller = module.get<MicroController>(MicroController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { MicroService } from './micro.service';

describe('MicroService', () => {
  let service: MicroService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MicroService],
    }).compile();

    service = module.get<MicroService>(MicroService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

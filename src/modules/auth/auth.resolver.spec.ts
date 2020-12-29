import { Test, TestingModule } from '@nestjs/testing';
import { AuthResolver } from './auth.resolver';

describe('AuthResolver', () => {
  let authResolver: AuthResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthResolver],
    }).compile();
    authResolver = module.get<AuthResolver>(AuthResolver);
  });

  it('should be defined', () => {
    expect(authResolver).toBeDefined();
  });
});

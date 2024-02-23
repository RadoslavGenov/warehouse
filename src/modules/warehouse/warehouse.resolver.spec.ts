import { Test, TestingModule } from '@nestjs/testing';
import { WarehouseResolver } from './warehouse.resolver';

describe('WarehouseResolver', () => {
  let resolver: WarehouseResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WarehouseResolver],
    }).compile();

    resolver = module.get<WarehouseResolver>(WarehouseResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});

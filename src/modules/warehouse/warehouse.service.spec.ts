import { Test, TestingModule } from '@nestjs/testing';

import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Warehouse } from './entities/warehouse.entity';

import { HistoryService } from '../history/history.service';
import { History } from '../history/entities/history.entity';
import { MockType } from 'test/types';
import { WarehouseService } from './warehouse.service';
import { Product } from '../product/entities/product.entity';
import { CreateWarehouseInput } from './dto/create-warehouse.input';
import { ProductService } from '../product/product.service';

describe('WarehouseService', () => {
  let service: WarehouseService;

  const warehouseRepositoryMock: MockType<Repository<Warehouse>> = {
    save: jest.fn(),
    findOneOrFail: jest.fn(),
    find: jest.fn(),
  };

  const productRepositoryMock: MockType<Repository<Product>> = {
    save: jest.fn(),
    find: jest.fn(),
    findOneOrFail: jest.fn(),
  };

  const historyRepositoryMock: MockType<Repository<History>> = {
    save: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        WarehouseService,
        ProductService,
        HistoryService,
        {
          provide: getRepositoryToken(Product),
          useValue: productRepositoryMock,
        },
        {
          provide: getRepositoryToken(Warehouse),
          useValue: warehouseRepositoryMock,
        },
        {
          provide: getRepositoryToken(History),
          useValue: historyRepositoryMock,
        },
      ],
    }).compile();

    service = module.get<WarehouseService>(WarehouseService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a new warehouse', async () => {
    const warehouseInput: CreateWarehouseInput = {
      size: 50,
      isHazardous: false,
    };

    warehouseRepositoryMock.findOneOrFail?.mockReturnValue(warehouseInput);
    await service.createWarehouse(warehouseInput);
    expect(warehouseRepositoryMock.save).toHaveBeenCalledWith({
      ...warehouseInput,
      remainingSpace: 50,
    });
  });

  it('should get a warehouse', async () => {
    const warehouse = {
      size: 50,
      isHazardous: false,
      id: 1,
      remainingSpace: 50,
      products: [],
    };

    warehouseRepositoryMock.findOneOrFail?.mockReturnValue(warehouse);
    await service.getWarehouse(warehouse.id);
    expect(warehouseRepositoryMock.findOneOrFail).toHaveBeenCalledWith({
      where: { id: warehouse.id },
    });
  });

  it('should get warehouses', async () => {
    const warehouses = [
      {
        size: 50,
        isHazardous: false,
        id: 1,
        remainingSpace: 50,
      },
      {
        size: 50,
        isHazardous: false,
        id: 2,
        remainingSpace: 50,
      },
    ];

    warehouseRepositoryMock.find?.mockReturnValue(warehouses);
    const foundWarehouses = await service.getWarehouses();
    expect(foundWarehouses).toContainEqual({
      size: 50,
      isHazardous: false,
      id: 2,
      remainingSpace: 50,
    });
    expect(warehouseRepositoryMock.find).toHaveBeenCalled();
  });
});

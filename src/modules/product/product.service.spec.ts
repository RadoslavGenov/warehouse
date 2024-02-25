import { Test, TestingModule } from '@nestjs/testing';
import { ProductService } from './product.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { CreateProductInput } from './dto/create-product.input';
import { HistoryService } from '../history/history.service';
import { History } from '../history/entities/history.entity';
import { MockType } from 'test/types';

describe('ProductService', () => {
  let service: ProductService;

  const productRepositoryMock: MockType<Repository<Product>> = {
    save: jest.fn(),
    findOneOrFail: jest.fn(),
    find: jest.fn(),
  };

  const historyRepositoryMock: MockType<Repository<History>> = {
    save: jest.fn(),
    find: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductService,
        HistoryService,
        {
          provide: getRepositoryToken(Product),
          useValue: productRepositoryMock,
        },
        {
          provide: getRepositoryToken(History),
          useValue: historyRepositoryMock,
        },
      ],
    }).compile();

    service = module.get<ProductService>(ProductService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a new product', async () => {
    const productInput: CreateProductInput = {
      name: 'test',
      description: 'test product',
      amount: 5,
      isHazardous: false,
    };

    productRepositoryMock.save?.mockReturnValue(productInput);
    const newProduct = await service.createProduct(productInput);
    expect(newProduct).toMatchObject(productInput);
    expect(productRepositoryMock.save).toHaveBeenCalledWith(productInput);
  });

  it('should get a product', async () => {
    const product = {
      name: 'test',
      description: 'test product',
      amount: 5,
      isHazardous: false,
      id: 1,
    };

    productRepositoryMock.findOneOrFail?.mockReturnValue(product);
    const foundProduct = await service.getProduct(product.id);
    expect(foundProduct).toMatchObject(product);
    expect(productRepositoryMock.findOneOrFail).toHaveBeenCalledWith({
      where: { id: product.id },
    });
  });

  it('should get products', async () => {
    const products = [
      {
        name: 'banana',
        description: 'sweet banana',
        amount: 5,
        isHazardous: false,
        id: 1,
      },
      {
        name: 'raspberry',
        description: 'sweet raspberry',
        amount: 5,
        isHazardous: false,
        id: 1,
      },
    ];

    productRepositoryMock.find?.mockReturnValue(products);
    const foundProducts = await service.getProducts();
    expect(foundProducts).toContainEqual({
      name: 'raspberry',
      description: 'sweet raspberry',
      amount: 5,
      isHazardous: false,
      id: 1,
    });
    expect(productRepositoryMock.find).toHaveBeenCalled();
  });

  it('should record an import', async () => {
    const productInput: CreateProductInput = {
      name: 'test',
      description: 'test product',
      amount: 5,
      isHazardous: false,
    };

    productRepositoryMock.save?.mockReturnValue(productInput);
    const newProduct = await service.createProduct(productInput);
    await service.recordImport(newProduct.id, 10, new Date());
    expect(productRepositoryMock.save).toHaveBeenCalled();
    expect(historyRepositoryMock.save).toHaveBeenCalled();
  });

  it('should record an export', async () => {
    const productInput: CreateProductInput = {
      name: 'test',
      description: 'test product',
      amount: 5,
      isHazardous: false,
    };

    productRepositoryMock.save?.mockReturnValue(productInput);
    const newProduct = await service.createProduct(productInput);
    await service.recordExport(newProduct.id, 10);
    expect(productRepositoryMock.save).toHaveBeenCalled();
    expect(historyRepositoryMock.save).toHaveBeenCalled();
  });
});

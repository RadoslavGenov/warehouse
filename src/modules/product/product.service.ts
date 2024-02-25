import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cron, CronExpression } from '@nestjs/schedule';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
import { CreateProductInput } from './dto/create-product.input';
import { Import } from './entities/import.entity';
import { HistoryService } from '../history/history.service';
import { RecordType } from '../history/entities/record-type.enum';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    private readonly historyService: HistoryService,
  ) {}

  async createProduct(product: CreateProductInput): Promise<Product> {
    const newProduct: Product = { ...new Product(), ...product };

    if (product.amount <= 0) {
      throw new Error('Product amount has to be at least 1');
    }

    return await this.productRepository.save(newProduct);
  }

  async getProduct(id: number): Promise<Product> {
    const product = await this.productRepository.findOneOrFail({
      where: { id },
    });

    return product;
  }

  async getProducts(): Promise<Product[]> {
    const products = await this.productRepository.find({
      relations: ['imports', 'warehouse'],
    });

    return products;
  }

  async recordExport(id: number, amount: number): Promise<Product> {
    const product = await this.productRepository.findOneOrFail({
      where: { id },
    });

    if (product.amount < amount) {
      throw new Error(`Insufficient stock amount for product: ${id}`);
    }

    const newProduct = {
      ...product,
      amount: product.amount - amount,
    };

    await this.historyService.createRecord({
      amount,
      date: new Date(),
      type: RecordType.Export,
      productName: product.name,
    });

    return await this.productRepository.save(newProduct);
  }

  async recordImport(id: number, amount: number, date: Date): Promise<Product> {
    const product = await this.productRepository.findOneOrFail({
      relations: ['imports'],
      where: { id },
    });

    const currentDate = new Date();

    if (amount <= 0) {
      throw new Error('Import amount has to be at least 1');
    }

    if (currentDate < date) {
      product.imports.push({ ...new Import(), amount, date });
    } else {
      product.amount += amount;
    }

    await this.historyService.createRecord({
      productName: product.name,
      amount,
      date,
      type: RecordType.Import,
    });

    return await this.productRepository.save(product);
  }

  @Cron(CronExpression.EVERY_12_HOURS)
  async scheduleImport() {
    const products = await this.productRepository
      .createQueryBuilder('product')
      .innerJoinAndSelect('product.imports', 'imports')
      .groupBy('product.id, imports.id')
      .having('COUNT(imports.id) > 0')
      .getMany();

    const currentDate = new Date();

    products.forEach((product) => {
      product.imports.forEach((record) => {
        if (record.date < currentDate) {
          const updatedProduct = {
            ...product,
            amount: product.amount + record.amount,
          };

          this.productRepository.save(updatedProduct);
        }
      });
    });
  }
}

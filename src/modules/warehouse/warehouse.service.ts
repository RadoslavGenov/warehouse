import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Warehouse } from './entities/warehouse.entity';
import { Repository } from 'typeorm';
import { ProductService } from '../product/product.service';
import { CreateWarehouseInput } from './dto/create-warehouse.input';

@Injectable()
export class WarehouseService {
  constructor(
    @InjectRepository(Warehouse)
    private readonly warehouseRepository: Repository<Warehouse>,
    private readonly productService: ProductService,
  ) {}

  async createWarehouse(warehouse: CreateWarehouseInput): Promise<Warehouse> {
    const newWarehouse: Warehouse = {
      ...new Warehouse(),
      ...warehouse,
      remainingSpace: warehouse.size,
    };

    return await this.warehouseRepository.save(newWarehouse);
  }

  async addProduct(warehouseId: number, productId: number): Promise<Warehouse> {
    const warehouse = await this.warehouseRepository.findOneOrFail({
      relations: ['products'],
      where: { id: warehouseId },
    });

    if (warehouse.remainingSpace <= 0) {
      throw new Error(
        `Insufficient space for product in warehouse: ${warehouseId}`,
      );
    }

    const product = await this.productService.getProduct(productId);

    if (product.isHazardous !== warehouse.isHazardous) {
      throw new Error(
        `Product: ${product.id} cannot be kept in warehouse: ${warehouseId}`,
      );
    }

    warehouse.products.push(product);

    warehouse.remainingSpace -= 1;

    return await this.warehouseRepository.save(warehouse);
  }

  async removeProduct(warehouseId: number, productId: number) {
    const warehouse = await this.warehouseRepository.findOneOrFail({
      relations: ['products'],
      where: { id: warehouseId },
    });

    const product = warehouse.products.find(
      (product) => product.id === productId,
    );

    if (!product) {
      throw new Error(`No such product in warehouse: ${warehouseId}`);
    }

    warehouse.products = warehouse.products.filter(
      (product) => product.id !== productId,
    );

    warehouse.remainingSpace += 1;

    return await this.warehouseRepository.save(warehouse);
  }

  async getWarehouses(): Promise<Warehouse[]> {
    const warehouses = await this.warehouseRepository.find();

    return warehouses;
  }

  async getWarehouse(id: number): Promise<Warehouse> {
    const warehouse = await this.warehouseRepository.findOneOrFail({
      where: { id },
    });

    return warehouse;
  }
}

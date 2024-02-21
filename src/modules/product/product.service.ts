import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
import { CreateProductInput } from './dto/create-product.input';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  createProduct(product: CreateProductInput): Promise<Product> {
    const newProduct = { ...new Product(), ...product };

    return this.productRepository.save(newProduct);
  }

  getProducts(): Promise<Product[]> {
    return this.productRepository.find();
  }
}

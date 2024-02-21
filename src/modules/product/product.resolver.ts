import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Product } from './entities/product.entity';
import { ProductService } from './product.service';
import { CreateProductInput } from './dto/create-product.input';

@Resolver(() => Product)
export class ProductResolver {
  constructor(private readonly productService: ProductService) {}

  @Mutation(() => Product)
  createProduct(@Args('product') createProductInput: CreateProductInput) {
    return this.productService.createProduct(createProductInput);
  }

  @Query(() => [Product])
  products() {
    return this.productService.getProducts();
  }
}

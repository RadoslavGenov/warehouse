import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
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

  @Mutation(() => Product)
  recordExport(
    @Args('id', { type: () => Int }) id: number,
    @Args('amount', { type: () => Int }) amount: number,
  ) {
    return this.productService.recordExport(id, amount);
  }

  @Mutation(() => Product)
  recordImport(
    @Args('id', { type: () => Int }) id: number,
    @Args('amount', { type: () => Int }) amount: number,
    @Args('date') date: Date,
  ) {
    return this.productService.recordImport(id, amount, date);
  }

  @Query(() => [Product], { name: 'products' })
  products() {
    return this.productService.getProducts();
  }

  @Query(() => Product, { name: 'product' })
  product(@Args('id', { type: () => Int }) id: number) {
    return this.productService.getProduct(id);
  }
}

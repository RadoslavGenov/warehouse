import { Args, ID, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Warehouse } from './entities/warehouse.entity';
import { WarehouseService } from './warehouse.service';
import { CreateWarehouseInput } from './dto/create-warehouse.input';

@Resolver(() => Warehouse)
export class WarehouseResolver {
  constructor(private readonly warehouseService: WarehouseService) {}

  @Mutation(() => Warehouse)
  createWarehouse(
    @Args('warehouse') createWarehouseInput: CreateWarehouseInput,
  ) {
    return this.warehouseService.createWarehouse(createWarehouseInput);
  }

  @Mutation(() => Warehouse)
  addProduct(
    @Args('warehouseId', { type: () => ID }) warehouseId: number,
    @Args('productId', { type: () => ID }) productId: number,
  ) {
    return this.warehouseService.addProduct(warehouseId, productId);
  }

  @Mutation(() => Warehouse)
  removeProduct(
    @Args('warehouseId', { type: () => ID }) warehouseId: number,
    @Args('productId', { type: () => ID }) productId: number,
  ) {
    return this.warehouseService.removeProduct(warehouseId, productId);
  }

  @Query(() => [Warehouse], { name: 'warehouses' })
  warehouses() {
    return this.warehouseService.getWarehouses();
  }

  @Query(() => Warehouse, { name: 'warehouse' })
  warehouse(@Args('id', { type: () => ID }) id: number) {
    return this.warehouseService.getWarehouse(id);
  }
}

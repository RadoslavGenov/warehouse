import { Module } from '@nestjs/common';
import { Warehouse } from './entities/warehouse.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WarehouseService } from './warehouse.service';
import { ProductModule } from '../product/product.module';
import { WarehouseResolver } from './warehouse.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([Warehouse]), ProductModule],
  providers: [WarehouseService, WarehouseResolver],
})
export class WarehouseModule {}

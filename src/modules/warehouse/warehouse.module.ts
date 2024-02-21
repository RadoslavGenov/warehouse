import { Module } from '@nestjs/common';
import { Warehouse } from './entities/warehouse.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Warehouse])],
})
export class WarehouseModule {}

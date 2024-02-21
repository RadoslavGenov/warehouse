import { Module } from '@nestjs/common';

import { DatabaseModule } from './database/database.modules';
import { CustomerModule } from './modules/customer/customer.module';
import { WarehouseModule } from './modules/warehouse/warehouse.module';
import { ProductModule } from './modules/product/product.module';
import { HistoryModule } from './modules/history/history.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    }),
    DatabaseModule,
    CustomerModule,
    WarehouseModule,
    ProductModule,
    HistoryModule,
  ],
})
export class AppModule {}

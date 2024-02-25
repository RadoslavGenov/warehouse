import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { History } from './entities/history.entity';
import { HistoryService } from './history.service';
import { HistoryResolver } from './history.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([History])],
  providers: [HistoryService, HistoryResolver],
  exports: [HistoryService],
})
export class HistoryModule {}

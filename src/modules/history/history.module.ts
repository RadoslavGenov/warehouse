import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { History } from './entities/history.entity';

@Module({
  imports: [TypeOrmModule.forFeature([History])],
})
export class HistoryModule {}

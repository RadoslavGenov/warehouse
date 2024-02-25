import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { History } from './entities/history.entity';
import { Repository } from 'typeorm';
import { RecordType } from './entities/record-type.enum';

@Injectable()
export class HistoryService {
  constructor(
    @InjectRepository(History)
    private readonly historyRepository: Repository<History>,
  ) {}

  async createRecord(
    amount: number,
    date: Date,
    type: RecordType,
  ): Promise<History> {
    const history: History = { ...new History(), amount, date, type };

    return await this.historyRepository.save(history);
  }

  async getHistory(): Promise<History[]> {
    const history = await this.historyRepository.find();

    return history;
  }
}

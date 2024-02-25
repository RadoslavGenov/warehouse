import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { History } from './entities/history.entity';
import { Repository } from 'typeorm';

@Injectable()
export class HistoryService {
  constructor(
    @InjectRepository(History)
    private readonly historyRepository: Repository<History>,
  ) {}

  async createRecord(record: Partial<History>): Promise<History> {
    const history: History = { ...new History(), ...record };

    return await this.historyRepository.save(history);
  }

  async getHistory(): Promise<History[]> {
    const history = await this.historyRepository.find({
      order: { date: 'DESC' },
    });

    return history;
  }
}

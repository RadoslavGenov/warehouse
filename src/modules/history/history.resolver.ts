import { Query, Resolver } from '@nestjs/graphql';
import { HistoryService } from './history.service';
import { History } from './entities/history.entity';

@Resolver(() => History)
export class HistoryResolver {
  constructor(private readonly historyService: HistoryService) {}

  @Query(() => [History], { name: 'history' })
  history() {
    return this.historyService.getHistory();
  }
}

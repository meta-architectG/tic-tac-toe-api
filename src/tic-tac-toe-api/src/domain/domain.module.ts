import { Module } from '@nestjs/common';
import { DatasourceModule } from '../datasource/datasource.module.js';
import { GameService } from './service/game.service.js';

/**
 * Слой domain — бизнес-логика.
 * Импортирует datasource (нужен репозиторий), экспортирует сервис.
 */
@Module({
  imports: [DatasourceModule],
  providers: [
    GameService,
    {
      provide: 'GameServiceInterface',
      useExisting: GameService,
    },
  ],
  exports: ['GameServiceInterface'],
})
export class DomainModule {}

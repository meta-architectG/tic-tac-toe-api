import { Module } from '@nestjs/common';
import { GameRepository } from './repository/game.repository.js';
import { GameStorage } from './storage/game.storage.js';

/**
 * Слой datasource — работа с данными.
 * Провайдеры: хранилище и репозиторий игр.
 */
@Module({
  providers: [
    GameStorage,
    GameRepository,
    {
      provide: 'GameRepositoryInterface',
      useExisting: GameRepository,
    },
  ],
  exports: ['GameRepositoryInterface'],
})
export class DatasourceModule {}

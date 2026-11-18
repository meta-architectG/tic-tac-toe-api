import { Injectable } from '@nestjs/common';
import { Game } from '../../domain/model/game.model.js';
import { GameDatasourceMapper } from '../mapper/game.mapper.js';
import { GameStorage } from '../storage/game.storage.js';
import { GameRepositoryInterface } from './game.repository.interface.js';

/**
 * Реализация репозитория игр через GameStorage (in-memory).
 */
@Injectable()
export class GameRepository implements GameRepositoryInterface {
  constructor(private readonly storage: GameStorage) {}

  save(game: Game): void {
    const entity = GameDatasourceMapper.toEntity(game);
    this.storage.save(entity);
  }

  findById(id: string): Game | undefined {
    const entity = this.storage.findById(id);
    return entity ? GameDatasourceMapper.toDomain(entity) : undefined;
  }
}

import { Game } from '../../domain/model/game.model.js';
import { GameEntity } from '../model/game.model.js';
import { BoardDatasourceMapper } from './board.mapper.js';

/**
 * Маппер между domain-моделью Game и datasource-моделью GameEntity.
 */
export class GameDatasourceMapper {
  /**
   * domain → datasource
   */
  static toEntity(game: Game): GameEntity {
    return new GameEntity(game.id, BoardDatasourceMapper.toEntity(game.board));
  }

  /**
   * datasource → domain
   */
  static toDomain(entity: GameEntity): Game {
    return new Game(entity.id, BoardDatasourceMapper.toDomain(entity.board));
  }
}

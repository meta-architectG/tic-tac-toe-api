import { Game } from '../../domain/model/game.model.js';
import type { GameOverResult } from '../../domain/service/game.service.interface.js';
import { BoardWebMapper } from './board.mapper.js';
import type { GameDto } from '../model/game.model.js';

/**
 * Маппер между domain-моделью Game и web-моделью GameDto.
 */
export class GameWebMapper {
  /**
   * domain → web.
   * Если передан результат isGameOver — добавляет статус в DTO.
   */
  static toDto(game: Game, over?: GameOverResult): GameDto {
    const dto: GameDto = {
      id: game.id,
      board: BoardWebMapper.toDto(game.board),
    };
    if (over) {
      dto.finished = over.finished;
      dto.status = over.status;
      dto.winner = over.winner;
    }
    return dto;
  }

  /**
   * web → domain
   */
  static toDomain(dto: GameDto): Game {
    return new Game(dto.id, BoardWebMapper.toDomain(dto.board));
  }
}

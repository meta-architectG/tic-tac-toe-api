import type { BoardDto } from './board.model.js';

/**
 * Web-модель текущей игры (DTO).
 */
export interface GameDto {
  /** UUID игры */
  id: string;
  /** Игровое поле */
  board: BoardDto;
  /** Статус игры: 'in_progress', 'x_wins', 'o_wins', 'draw' */
  status?: string;
  /** Закончилась ли игра */
  finished?: boolean;
  /** Победитель (1 = X, 2 = O), если есть */
  winner?: number;
}

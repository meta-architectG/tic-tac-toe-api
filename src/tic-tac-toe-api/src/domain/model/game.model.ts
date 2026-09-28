import { Board } from './board.model.js';

/**
 * Доменная модель текущей игры.
 * Содержит уникальный идентификатор игры (UUID) и текущее игровое поле.
 */
export class Game {
  /**
   * Уникальный идентификатор игры (UUID v4).
   */
  readonly id: string;

  /**
   * Текущее игровое поле.
   */
  readonly board: Board;

  constructor(id: string, board?: Board) {
    this.id = id;
    this.board = board ?? new Board();
  }

  /**
   * Возвращает копию игры с обновлённым полем.
   * (Полезно, чтобы не мутировать оригинал при передаче между слоями.)
   */
  withBoard(board: Board): Game {
    return new Game(this.id, board);
  }
}

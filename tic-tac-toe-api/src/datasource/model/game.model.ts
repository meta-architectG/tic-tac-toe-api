import { BoardEntity } from './board.model.js';

/**
 * Datasource-модель текущей игры.
 * Как игра хранится в хранилище: id + поле.
 */
export class GameEntity {
  constructor(
    public readonly id: string,
    public readonly board: BoardEntity,
  ) {}
}

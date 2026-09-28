import { GameEntity } from '../model/game.model.js';

/**
 * Класс-хранилище текущих игр.
 * Хранит игры в памяти (Map: id → GameEntity).
 * Живёт на уровне приложения — одна копия на весь NestJS-процесс.
 */
export class GameStorage {
  private readonly games = new Map<string, GameEntity>();

  /**
   * Сохраняет игру (создаёт или перезаписывает).
   */
  save(game: GameEntity): void {
    this.games.set(game.id, game);
  }

  /**
   * Возвращает игру по id или undefined, если её нет.
   */
  findById(id: string): GameEntity | undefined {
    return this.games.get(id);
  }

  /**
   * Удаляет игру по id (может пригодиться позже).
   */
  delete(id: string): void {
    this.games.delete(id);
  }
}

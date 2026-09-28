import { Game } from '../../domain/model/game.model.js';

/**
 * Интерфейс репозитория игр.
 * Описывает контракт работы с хранилищем — независимо от того,
 * что именно используется (Map, БД, Redis и т.д.).
 */
export interface GameRepositoryInterface {
  /**
   * Сохраняет игру.
   */
  save(game: Game): void;

  /**
   * Возвращает игру по id или undefined, если её нет.
   */
  findById(id: string): Game | undefined;
}

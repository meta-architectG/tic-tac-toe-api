import { CellPosition, CellValue } from '../model/board.model.js';
import { Game } from '../model/game.model.js';

/**
 * Результат валидации игрового поля.
 */
export interface BoardValidationResult {
  /** Валидно ли поле */
  valid: boolean;
  /** Причина ошибки, если valid = false */
  reason?: string;
}

/**
 * Статус игры.
 */
export enum GameStatus {
  IN_PROGRESS = 'in_progress',
  X_WINS = 'x_wins',
  O_WINS = 'o_wins',
  DRAW = 'draw',
}

/**
 * Результат проверки окончания игры.
 */
export interface GameOverResult {
  /** Закончилась ли игра */
  finished: boolean;
  /** Статус игры */
  status: GameStatus;
  /** Победитель, если есть */
  winner?: CellValue;
}

/**
 * Интерфейс доменного сервиса игры.
 * Описывает бизнес-логику: следующий ход (Минимакс), валидацию поля, проверку окончания игры.
 */
export interface GameServiceInterface {
  /**
   * Возвращает следующий ход компьютера (нолика) по алгоритму Минимакс.
   *
   * @param game — текущая игра (поле, на котором нужно сделать ход)
   * @returns координаты клетки, куда компьютер поставит O
   */
  getNextMove(game: Game): CellPosition;

  /**
   * Проверяет корректность обновлённого игрового поля.
   * Убеждается, что не изменены предыдущие ходы и соблюдён порядок ходов.
   *
   * @param previous — поле до хода игрока
   * @param updated — поле после хода игрока
   * @returns результат валидации с описанием ошибки, если она есть
   */
  validateBoard(previous: Game, updated: Game): BoardValidationResult;

  /**
   * Проверяет, закончилась ли игра (победа X, победа O или ничья).
   *
   * @param game — текущая игра
   * @returns результат проверки окончания игры
   */
  isGameOver(game: Game): GameOverResult;
}

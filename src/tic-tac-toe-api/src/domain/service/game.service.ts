import { Inject, Injectable } from '@nestjs/common';
import {
  BOARD_SIZE,
  Board,
  CellPosition,
  CellValue,
} from '../model/board.model.js';
import { Game } from '../model/game.model.js';
import type { GameRepositoryInterface } from '../../datasource/repository/game.repository.interface.js';
import {
  BoardValidationResult,
  GameOverResult,
  GameServiceInterface,
  GameStatus,
} from './game.service.interface.js';

/**
 * Реализация доменного сервиса игры.
 * Содержит бизнес-логику: Минимакс, валидацию, проверку окончания игры.
 */
@Injectable()
export class GameService implements GameServiceInterface {
  /**
   * Все выигрышные линии на поле 3x3.
   * Каждая линия — три позиции (строка, столбец).
   */
  private static readonly WIN_LINES: CellPosition[][] = [
    // строки
    [
      { row: 0, col: 0 },
      { row: 0, col: 1 },
      { row: 0, col: 2 },
    ],
    [
      { row: 1, col: 0 },
      { row: 1, col: 1 },
      { row: 1, col: 2 },
    ],
    [
      { row: 2, col: 0 },
      { row: 2, col: 1 },
      { row: 2, col: 2 },
    ],
    // столбцы
    [
      { row: 0, col: 0 },
      { row: 1, col: 0 },
      { row: 2, col: 0 },
    ],
    [
      { row: 0, col: 1 },
      { row: 1, col: 1 },
      { row: 2, col: 1 },
    ],
    [
      { row: 0, col: 2 },
      { row: 1, col: 2 },
      { row: 2, col: 2 },
    ],
    // диагонали
    [
      { row: 0, col: 0 },
      { row: 1, col: 1 },
      { row: 2, col: 2 },
    ],
    [
      { row: 0, col: 2 },
      { row: 1, col: 1 },
      { row: 2, col: 0 },
    ],
  ];

  constructor(
    @Inject('GameRepositoryInterface')
    private readonly repository: GameRepositoryInterface,
  ) {}
  // ============================================================
  // Публичные методы из GameServiceInterface
  // ============================================================

  /**
   * Возвращает следующий ход компьютера (нолика) по алгоритму Минимакс.
   */
  getNextMove(game: Game): CellPosition {
    const board = game.board.clone();
    const best = this.minimax(board, CellValue.O, true);
    // best.position — координаты лучшего хода
    return best.position!;
  }

  /**
   * Проверяет корректность обновлённого поля.
   * Убеждается, что:
   *  - размеры поля 3x3;
   *  - значения клеток — только 0/1/2;
   *  - не изменены ранее сделанные ходы (все старые ненулевые клетки сохранились);
   *  - добавлен ровно один новый ход;
   *  - этот ход — крестик (X).
   */
  validateBoard(previous: Game, updated: Game): BoardValidationResult {
    // 1. Проверка размеров поля
    if (
      updated.board.cells.length !== BOARD_SIZE ||
      updated.board.cells.some((row) => row.length !== BOARD_SIZE)
    ) {
      return { valid: false, reason: 'Поле должно быть размером 3x3' };
    }

    // 2. Проверка допустимых значений
    for (const row of updated.board.cells) {
      for (const cell of row) {
        if (
          cell !== CellValue.EMPTY &&
          cell !== CellValue.X &&
          cell !== CellValue.O
        ) {
          return { valid: false, reason: 'Недопустимое значение клетки' };
        }
      }
    }

    // 3. Проверка, что старые ходы не изменены
    let newMovesCount = 0;
    for (let r = 0; r < BOARD_SIZE; r++) {
      for (let c = 0; c < BOARD_SIZE; c++) {
        const prev = previous.board.cells[r][c];
        const curr = updated.board.cells[r][c];
        if (prev !== CellValue.EMPTY && prev !== curr) {
          return {
            valid: false,
            reason: `Нельзя изменять уже сделанный ход в клетке (${r}, ${c})`,
          };
        }
        if (prev === CellValue.EMPTY && curr !== CellValue.EMPTY) {
          newMovesCount++;
          if (curr !== CellValue.X) {
            return {
              valid: false,
              reason: 'Игрок должен ходить крестиком (X)',
            };
          }
        }
      }
    }

    if (newMovesCount !== 1) {
      return {
        valid: false,
        reason: 'За один ход можно добавить ровно одну клетку',
      };
    }

    // 4. Проверка порядка ходов: X ходит первым, значит X = O или X = O + 1
    const { countX, countO } = this.countCells(updated.board);
    if (countX !== countO && countX !== countO + 1) {
      return {
        valid: false,
        reason: 'Нарушен порядок ходов (X ходит первым)',
      };
    }

    return { valid: true };
  }

  /**
   * Проверяет, закончилась ли игра (победа X, победа O или ничья).
   */
  isGameOver(game: Game): GameOverResult {
    const board = game.board;

    // Проверяем выигрышные линии
    for (const line of GameService.WIN_LINES) {
      const [a, b, c] = line;
      const v = board.getCell(a);
      if (
        v !== CellValue.EMPTY &&
        v === board.getCell(b) &&
        v === board.getCell(c)
      ) {
        return {
          finished: true,
          status: v === CellValue.X ? GameStatus.X_WINS : GameStatus.O_WINS,
          winner: v,
        };
      }
    }

    // Если есть пустые клетки — игра идёт
    const hasEmpty = board.cells.some((row) =>
      row.some((cell) => cell === CellValue.EMPTY),
    );
    if (hasEmpty) {
      return { finished: false, status: GameStatus.IN_PROGRESS };
    }

    // Пустых нет и никто не победил — ничья
    return { finished: true, status: GameStatus.DRAW };
  }

  // ============================================================
  // Вспомогательные методы
  // ============================================================

  /**
   * Считает количество X и O на поле.
   */
  private countCells(board: Board): { countX: number; countO: number } {
    let countX = 0;
    let countO = 0;
    for (const row of board.cells) {
      for (const cell of row) {
        if (cell === CellValue.X) countX++;
        if (cell === CellValue.O) countO++;
      }
    }
    return { countX, countO };
  }

  /**
   * Проверяет, есть ли победитель на текущем поле.
   * Возвращает значение победителя или null.
   */
  private getWinner(board: Board): CellValue | null {
    for (const line of GameService.WIN_LINES) {
      const [a, b, c] = line;
      const v = board.getCell(a);
      if (
        v !== CellValue.EMPTY &&
        v === board.getCell(b) &&
        v === board.getCell(c)
      ) {
        return v;
      }
    }
    return null;
  }

  /**
   * Проверяет, заполнено ли поле полностью (для Минимакса).
   */
  private isFull(board: Board): boolean {
    return board.cells.every((row) =>
      row.every((cell) => cell !== CellValue.EMPTY),
    );
  }

  /**
   * Возвращает список свободных клеток.
   */
  private getEmptyCells(board: Board): CellPosition[] {
    const cells: CellPosition[] = [];
    for (let r = 0; r < BOARD_SIZE; r++) {
      for (let c = 0; c < BOARD_SIZE; c++) {
        if (board.cells[r][c] === CellValue.EMPTY)
          cells.push({ row: r, col: c });
      }
    }
    return cells;
  }

  /**
   * Алгоритм Минимакс.
   *
   * @param board — текущее поле (мутируется/восстанавливается)
   * @param currentPlayer — чей сейчас ход (X или O)
   * @param isMaximizing — true, если максимизируем (ход компьютера O)
   * @returns { score, position } — оценка и лучшая позиция (для корневого вызова)
   */
  private minimax(
    board: Board,
    currentPlayer: CellValue,
    isMaximizing: boolean,
  ): { score: number; position?: CellPosition } {
    // Терминальные случаи
    const winner = this.getWinner(board);
    if (winner === CellValue.O) return { score: 10 }; // компьютер победил
    if (winner === CellValue.X) return { score: -10 }; // игрок победил
    if (this.isFull(board)) return { score: 0 }; // ничья

    const emptyCells = this.getEmptyCells(board);
    let bestScore = isMaximizing ? -Infinity : Infinity;
    let bestPosition: CellPosition | undefined;

    for (const cell of emptyCells) {
      // Пробуем ход
      board.setCell(cell, currentPlayer);

      const nextPlayer =
        currentPlayer === CellValue.O ? CellValue.X : CellValue.O;
      const { score } = this.minimax(board, nextPlayer, !isMaximizing);

      // Откатываем ход
      board.setCell(cell, CellValue.EMPTY);

      if (isMaximizing) {
        if (score > bestScore) {
          bestScore = score;
          bestPosition = cell;
        }
      } else {
        if (score < bestScore) {
          bestScore = score;
          bestPosition = cell;
        }
      }
    }

    return { score: bestScore, position: bestPosition };
  }
}

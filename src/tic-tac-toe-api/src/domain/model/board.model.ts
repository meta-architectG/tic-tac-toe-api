/**
 * Значения клеток игрового поля.
 * EMPTY — пустая клетка
 * X — крестик (ход игрока)
 * O — нолик (ход компьютера)
 */
export enum CellValue {
  EMPTY = 0,
  X = 1,
  O = 2,
}

/**
 * Размер игрового поля (3x3).
 */
export const BOARD_SIZE = 3;

/**
 * Координаты клетки на игровом поле.
 */
export interface CellPosition {
  row: number;
  col: number;
}

/**
 * Доменная модель игрового поля.
 * Представляет собой целочисленную матрицу 3x3.
 */
export class Board {
  /**
   * Двумерный массив 3x3, где каждый элемент — CellValue.
   */
  readonly cells: CellValue[][];

  constructor(cells?: CellValue[][]) {
    this.cells = cells ?? Board.createEmpty();
  }

  /**
   * Создаёт пустое игровое поле 3x3, заполненное CellValue.EMPTY.
   */
  static createEmpty(): CellValue[][] {
    return Array.from({ length: BOARD_SIZE }, () =>
      Array.from({ length: BOARD_SIZE }, () => CellValue.EMPTY),
    );
  }

  /**
   * Возвращает значение клетки по координатам.
   */
  getCell(position: CellPosition): CellValue {
    return this.cells[position.row][position.col];
  }

  /**
   * Устанавливает значение клетки (мутирует текущее поле).
   * ВНИМАНИЕ: метод меняет состояние объекта — используйте осознанно.
   */
  setCell(position: CellPosition, value: CellValue): void {
    this.cells[position.row][position.col] = value;
  }

  /**
   * Возвращает глубокую копию поля (чтобы избежать мутаций при передаче).
   */
  clone(): Board {
    return new Board(this.cells.map((row) => [...row]));
  }

  /**
   * Проверяет, что координаты в пределах поля.
   */
  isInside(position: CellPosition): boolean {
    return (
      position.row >= 0 &&
      position.row < BOARD_SIZE &&
      position.col >= 0 &&
      position.col < BOARD_SIZE
    );
  }
}

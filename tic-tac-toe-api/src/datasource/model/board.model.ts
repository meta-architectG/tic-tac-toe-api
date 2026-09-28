/**
 * Datasource-модель игрового поля.
 * Представление поля для хранения — целочисленная матрица 3x3.
 * Значения: 0 — пусто, 1 — X, 2 — O.
 */
export class BoardEntity {
  constructor(public readonly cells: number[][]) {}
}

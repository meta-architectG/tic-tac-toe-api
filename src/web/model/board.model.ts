/**
 * Web-модель игрового поля (DTO).
 * То, что клиент присылает и получает по HTTP.
 * cells — матрица 3x3 чисел: 0 — пусто, 1 — X, 2 — O.
 */
export interface BoardDto {
  cells: number[][];
}

import { Board, CellValue } from '../../domain/model/board.model.js';
import { BoardEntity } from '../model/board.model.js';

/**
 * Маппер между domain-моделью Board и datasource-моделью BoardEntity.
 */
export class BoardDatasourceMapper {
  /**
   * domain → datasource
   */
  static toEntity(board: Board): BoardEntity {
    // Копируем матрицу, чтобы не мутировать domain-модель
    const cells = board.cells.map((row) => row.map((cell) => cell as number));
    return new BoardEntity(cells);
  }

  /**
   * datasource → domain
   */
  static toDomain(entity: BoardEntity): Board {
    const cells = entity.cells.map((row) =>
      row.map((cell) => cell as CellValue),
    );
    return new Board(cells);
  }
}

import { Board, CellValue } from '../../domain/model/board.model.js';
import { BoardDto } from '../model/board.model.js';

/**
 * Маппер между domain-моделью Board и web-моделью BoardDto.
 */
export class BoardWebMapper {
  /**
   * domain → web
   */
  static toDto(board: Board): BoardDto {
    return {
      cells: board.cells.map((row) => row.map((cell) => cell as number)),
    };
  }

  /**
   * web → domain
   */
  static toDomain(dto: BoardDto): Board {
    const cells = dto.cells.map((row) => row.map((cell) => cell as CellValue));
    return new Board(cells);
  }
}

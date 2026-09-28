import {
  BadRequestException,
  Body,
  Controller,
  Inject,
  NotFoundException,
  Param,
  Post,
} from '@nestjs/common';
import { randomUUID } from 'node:crypto';
import type { GameRepositoryInterface } from '../../datasource/repository/game.repository.interface.js';
import { CellValue } from '../../domain/model/board.model.js';
import { Game } from '../../domain/model/game.model.js';
import type { GameServiceInterface } from '../../domain/service/game.service.interface.js';
import { GameWebMapper } from '../mapper/game.mapper.js';
import type { GameDto } from '../model/game.model.js';

/**
 * Контроллер игры «Крестики-нолики».
 * Поддерживает несколько игр одновременно (ключ — UUID в URL).
 */
@Controller('game')
export class GameController {
  constructor(
    @Inject('GameRepositoryInterface')
    private readonly repository: GameRepositoryInterface,
    @Inject('GameServiceInterface')
    private readonly gameService: GameServiceInterface,
  ) {}

  /**
   * POST /game
   * Создаёт новую пустую игру и возвращает её (с UUID).
   */
  @Post()
  create(): GameDto {
    const id = randomUUID();
    const newGame = new Game(id);
    this.repository.save(newGame);
    const over = this.gameService.isGameOver(newGame);
    return GameWebMapper.toDto(newGame, over);
  }

  /**
   * POST /game/{UUID}
   * Принимает текущую игру с обновлённым игроком полем,
   * возвращает игру с ходом компьютера (нолика) и статусом.
   */
  @Post(':id')
  play(@Param('id') id: string, @Body() dto: GameDto): GameDto {
    // 1. Получаем игру из хранилища
    const existing = this.repository.findById(id);
    if (!existing) {
      throw new NotFoundException(`Игра с id=${id} не найдена`);
    }

    // 2. Преобразуем DTO в domain
    const updatedGame = GameWebMapper.toDomain({ ...dto, id });

    // 3. Валидируем поле
    const validation = this.gameService.validateBoard(existing, updatedGame);
    if (!validation.valid) {
      throw new BadRequestException({
        message: 'Некорректное игровое поле',
        reason: validation.reason,
      });
    }

    // 4. Проверяем, не закончилась ли игра после хода игрока
    const afterPlayer = this.gameService.isGameOver(updatedGame);
    if (afterPlayer.finished) {
      this.repository.save(updatedGame);
      return GameWebMapper.toDto(updatedGame, afterPlayer);
    }

    // 5. Ход компьютера
    const computerMove = this.gameService.getNextMove(updatedGame);
    const boardAfterComputer = updatedGame.board.clone();
    boardAfterComputer.setCell(computerMove, CellValue.O);
    const finalGame = updatedGame.withBoard(boardAfterComputer);

    // 6. Сохраняем и возвращаем со статусом
    this.repository.save(finalGame);
    const over = this.gameService.isGameOver(finalGame);
    return GameWebMapper.toDto(finalGame, over);
  }
}

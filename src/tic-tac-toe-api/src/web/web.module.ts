import { Module } from '@nestjs/common';
import { DatasourceModule } from '../datasource/datasource.module.js';
import { DomainModule } from '../domain/domain.module.js';
import { GameController } from './controller/game.controller.js';

/**
 * Слой web — взаимодействие с клиентом.
 * Импортирует domain и datasource, регистрирует контроллер.
 */
@Module({
  imports: [DatasourceModule, DomainModule],
  controllers: [GameController],
})
export class WebModule {}

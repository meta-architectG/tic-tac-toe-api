import { Module } from '@nestjs/common';
import { DatasourceModule } from './datasource/datasource.module.js';
import { DomainModule } from './domain/domain.module.js';
import { WebModule } from './web/web.module.js';

/**
 * Корневой модуль приложения.
 * Собирает все слои: datasource, domain, web.
 */
@Module({
  imports: [DatasourceModule, DomainModule, WebModule],
})
export class AppModule {}

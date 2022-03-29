import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';

import { CONFIGURATION_SERVICE } from './configuration/configuration.constants';
import { AllExceptionsFilter } from './exception-filter/all-exception.filter';
import { ConfigurationInterface } from './configuration/configuration.interface';
import { AppModule } from './app.module';
import { CustomLoggerService } from './custom-logger/custom-logger.service';

import helmet from 'helmet';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config: ConfigurationInterface = app.get(CONFIGURATION_SERVICE);

  const port = await config.getServerPort();
  const frontendUrl = await config.getFrontendUrl();

  const logger = app.get(CustomLoggerService);

  app.useLogger(logger);
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new AllExceptionsFilter(logger));
  app.use(helmet());
  app.enableCors({
    origin: frontendUrl,
    credentials: true,
  });
  app.use(cookieParser());

  await app.listen(port);
  logger.log(`Server listening on port ${port}...`, { context: 'main' });
}
bootstrap();

import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';

import { CONFIGURATION_SERVICE } from './configuration/configuration.constants';
import { AllExceptionsFilter } from './exception-filter/all-exception.filter';
import { AppModule } from './app.module';
import { CustomLoggerService } from './custom-logger/custom-logger.service';

import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get(CONFIGURATION_SERVICE);

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

  await app.listen(port);
  logger.log(`Server listening on port ${port}...`, { context: 'main' });
}
bootstrap();

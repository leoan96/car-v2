import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';

import { CONFIGURATION_SERVICE } from './configuration/configuration.constants';
import { AppModule } from './app.module';
import { CustomLoggerService } from './custom-logger/custom-logger.service';

import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get(CONFIGURATION_SERVICE);

  const port = await config.getServerPort();
  const frontendUrl = await config.getFrontendUrl();

  app.useLogger(app.get(CustomLoggerService));
  app.useGlobalPipes(new ValidationPipe());
  app.use(helmet());
  app.enableCors({
    origin: frontendUrl,
    credentials: true,
  });

  const logger = app.get(CustomLoggerService);

  await app.listen(port);
  logger.log(`Server listening on port ${port}...`, { context: 'main' });
}
bootstrap();

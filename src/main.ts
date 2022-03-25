import { NestFactory } from '@nestjs/core';

import { CONFIGURATION_SERVICE } from './configuration/configuration.constants';
import { AppModule } from './app.module';

import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get(CONFIGURATION_SERVICE);

  const port = await config.getServerPort();

  app.use(helmet());

  await app.listen(port);
  console.log(`Server listening on port ${port}...`);
}
bootstrap();

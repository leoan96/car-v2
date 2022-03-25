import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';

import { ServerConfig } from './configuration/config/server';
import { AppModule } from './app.module';

import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get(ConfigService);
  const serverConfig = config.get<ServerConfig>('server');
  const port = serverConfig.port;

  app.use(helmet());

  await app.listen(port);
  console.log(`Server listening on port ${port}...`);
}
bootstrap();

import { Global, Module } from '@nestjs/common';

import { WINSTON_LOGGER } from './winston/winston.constants';
import { CustomLoggerService } from './custom-logger.service';

import winston from './winston/winston';

@Global()
@Module({
  providers: [
    {
      provide: WINSTON_LOGGER,
      useValue: winston,
    },
    CustomLoggerService,
  ],
  exports: [CustomLoggerService],
})
export class CustomLoggerModule {}

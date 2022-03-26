import { Inject, Injectable, LoggerService } from '@nestjs/common';

import { WINSTON_LOGGER } from './winston/winston.constants';

import winston from 'winston';

@Injectable()
export class CustomLoggerService implements LoggerService {
  constructor(
    @Inject(WINSTON_LOGGER) private readonly winstonLogger: winston.Logger,
  ) {}

  public log(message: any, ...metadata: any[]) {
    this.winstonLogger.log('info', message, metadata);
  }

  public error(message: any, ...metadata: any[]) {
    this.winstonLogger.error(message, metadata);
  }

  public warn(message: any, ...metadata: any[]) {
    this.winstonLogger.warn(message, metadata);
  }

  public debug(message: any, ...metadata: any[]) {
    this.winstonLogger.debug(message, metadata);
  }

  public verbose(message: any, ...metadata: any[]) {
    this.winstonLogger.verbose(message, metadata);
  }
}

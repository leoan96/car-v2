import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  BadRequestException,
} from '@nestjs/common';

import { CustomLoggerService } from '../custom-logger/custom-logger.service';

import { Request, Response } from 'express';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  constructor(private readonly logger: CustomLoggerService) {}

  catch(exception: unknown, host: ArgumentsHost): void {
    const context = host.switchToHttp();

    this.logger.error(exception);

    const response = context.getResponse<Response>();
    const request = context.getRequest<Request>();

    const httpStatus =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const message =
      exception instanceof HttpException
        ? exception.message
        : 'Oops! Something went wrong! Please try again later';

    if (exception instanceof BadRequestException) {
      response.status(httpStatus).json({
        timestamp: new Date().toISOString(),
        statusCode: httpStatus,
        message: exception['response']['message'],
        path: request.url,
      });
    } else {
      response.status(httpStatus).json({
        timestamp: new Date().toISOString(),
        statusCode: httpStatus,
        message,
        path: request.url,
      });
    }
  }
}

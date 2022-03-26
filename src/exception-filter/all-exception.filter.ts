import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

import { Request, Response } from 'express';
import { CustomLoggerService } from '../custom-logger/custom-logger.service';

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

    response.status(httpStatus).json({
      timestamp: new Date().toISOString(),
      statusCode: httpStatus,
      message: 'Oops! Something went wrong! Please try again later',
      path: request.url,
    });
  }
}

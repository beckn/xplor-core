// src/common/filters/global-exception.filter.ts

import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { Request, Response } from 'express';
import { AxiosError } from 'axios'; // Import AxiosError type

import { ERROR_MESSAGES, STATUS_CODES } from '../constants/error-message'; // Import the constants

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    let status = STATUS_CODES.INTERNAL_SERVER_ERROR;
    let message: any = ERROR_MESSAGES.INTERNAL_SERVER_ERROR;

    // Check if the exception is an AxiosError
    if (exception instanceof AxiosError) {
      status = exception.response?.status || STATUS_CODES.INTERNAL_SERVER_ERROR;
      message = exception.response?.data?.message || ERROR_MESSAGES.AXIOS_REQUEST_FAILED;
    } else if (exception instanceof HttpException) {
      status = exception.getStatus();
      message = exception.getResponse();
    }

    // Custom handling based on exception type
    switch (status) {
      case STATUS_CODES.BAD_REQUEST:
        message = ERROR_MESSAGES.BAD_REQUEST;
        break;
      case STATUS_CODES.UNAUTHORIZED:
        message = ERROR_MESSAGES.UNAUTHORIZED;
        break;
      case STATUS_CODES.FORBIDDEN:
        message = ERROR_MESSAGES.FORBIDDEN;
        break;
      case STATUS_CODES.NOT_FOUND:
        message = ERROR_MESSAGES.NOT_FOUND;
        break;
      // Add more cases as needed
    }

    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      message: message,
    });
  }
}

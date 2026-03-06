import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { Request, Response } from 'express';
@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let finalMessage = 'Internal Server Error';

    // Prisma Error
    if (exception instanceof Prisma.PrismaClientKnownRequestError) {
      status = HttpStatus.BAD_REQUEST;
      const modelName =
        (exception?.meta?.modelName as string).toLowerCase() || 'Record';

      switch (exception.code) {
        case 'P2002':
          status = HttpStatus.CONFLICT;
          finalMessage = `This ${modelName} already exists.`;
          break;
        case 'P2003':
          status = HttpStatus.BAD_REQUEST;
          finalMessage = `The referenced ${modelName} does not exist.`;
          break;
        case 'P2025':
          status = HttpStatus.NOT_FOUND;
          finalMessage = `This ${modelName} not found in our records.`;
          break;
        default:
          finalMessage = `Database Error: ${exception.code}`;
      }
    }
    // Https exception error
    else if (exception instanceof HttpException) {
      status = exception.getStatus();
      const exceptionResponse = exception.getResponse();

      if (typeof exceptionResponse === 'string') {
        finalMessage = exceptionResponse;
      } else if (
        typeof exceptionResponse === 'object' &&
        exceptionResponse !== null
      ) {
        const msg = (exceptionResponse as any).message;
        finalMessage = Array.isArray(msg) ? msg.join(', ') : msg;
      }
    } else {
      finalMessage = exception.message || 'Something went wrong';
    }

    response.status(status).json({
      success: false,
      statusCode: status,
      message: finalMessage,
      path: request.url,
      timestamp: new Date().toISOString(),
    });
  }
}

import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as fs from 'fs';
import * as path from 'path';
import { Response, Request } from 'express';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    let status: HttpStatus;
    let errorMessage: any;

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      errorMessage =
        (exception.getResponse() as { message: string }).message ||
        exception.message;
    } else {
      status = HttpStatus.INTERNAL_SERVER_ERROR;
      errorMessage = 'Internal Server Error';
    }
    const tokenError = this.getTokenError(request);
    const errorResponse = this.getErrorResponse(status, errorMessage, request);
    const errorLog = this.getErrorLog(
      errorResponse,
      request,
      exception,
      tokenError,
    );
    this.writeErrorLogToFile(errorLog);
    response.status(status).json(errorResponse);
  }

  private getErrorResponse = (
    status: HttpStatus,
    errorMessage: any,
    request: Request,
  ) => ({
    requestUser: this.getAuthenticatedUser(request) || 'Unauthenticated User',
    statusCode: status,
    error: errorMessage,
    path: request.url,
    method: request.method,
    timeStamp: new Date(),
  });

  private getTokenError(request: any) {
    try {
      if (request?.cookies?.Authentication != null)
        this.jwtService.verify(request?.cookies?.Authentication, {
          secret: Buffer.from(
            this.configService.get<string>('jwt.accessToken.secret'),
            'base64',
          ).toString(),
        });

      if (request?.headers?.authentication != null)
        this.jwtService.verify(request?.headers?.authentication.split(' ')[1], {
          secret: Buffer.from(
            this.configService.get<string>('jwt.accessToken.secret'),
            'base64',
          ).toString(),
        });

      return null; //no errors
    } catch (error) {
      return error;
    }
  }
  /**

  Gets the authenticated userId if the access_token received is present, valid, and not malformed.

@private

@param {*} request - the request that threw an exception

* @return {*} - the userId of the request user or null

@memberof AllExceptionsFilter

*/

  private getAuthenticatedUser(request) {
    if (request?.cookies?.Authentication != null) {
      let tokenDecoded = this.jwtService.decode(
        request?.cookies?.Authentication,
      );

      return tokenDecoded ? tokenDecoded['userId'] : null;
    }

    if (request?.headers?.authentication != null) {
      let tokenDecoded = this.jwtService.decode(
        request?.headers?.authentication.split(' ')[1],
      );

      return tokenDecoded ? tokenDecoded['userId'] : null;
    }
  }

  private getErrorLog = (
    errorResponse: any,
    request: Request,
    exception: any,
    tokenError: any,
  ): string => {
    const { statusCode, error, requestUser, timeStamp } = errorResponse;
    const { method, url } = request;
    const errorLog = `\nResponse Code: ${statusCode} | Method: ${method} | URL: ${url} | UserId: ${requestUser} | TimeStamp: ${timeStamp}\n${
      exception.stack || error
    }\n${tokenError?.stack ?? ''}${tokenError ? '\n' : ''}`;
    return errorLog;
  };

  private writeErrorLogToFile = (errorLog: string): void => {
    fs.appendFile(
      path.join(__dirname, '../../../src/logs/error.log'),
      errorLog,
      'utf8',
      (err) => {
        if (err) throw err;
      },
    );
  };
}

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
  /**
   * Overriding the default exceptions filter catch method in Nestjs
   * @param exception the incoming exception of any type, no type specified in the catch
   * @param host contains helper arguments to be passed to the handler
   */
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

  /**
   * Gets a parsed response object for incoming exceptions
   * @private
   * @param status status of exception
   * @param errorMessage message of exception
   * @param request request obj of exception
   * @returns parsed response object
   */
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

  /**
   * Detects any errors from jwt exceptions
   * @private
   * @param request the request obj of exception
   * @returns jwt errors or null
   */
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
   * Gets the authenticated userId if the access_token received is present, valid, and not malformed.
   * @private
   * @param {*} request - the request that threw an exception
   * @return {*} - the userId of the request user or null
   * @memberof AllExceptionsFilter
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

  /**
   * Gets a parsed error log string thats written to log files.
   * @private
   * @param errorResponse parsed response obj of exception
   * @param request request obj og exception
   * @param exception exception obj
   * @param tokenError any jwt related errors
   * @returns a parsed log string for log files
   */
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

  /**
   * A helper function to write log strings to log files
   * @private
   * @param errorLog the parsed log string to be written to log files
   */
  private writeErrorLogToFile = (errorLog: string): void => {
    fs.appendFile(
      path.join(__dirname, '../../src/logs/error.log'),
      errorLog,
      'utf8',
      (err) => {
        if (err) throw err;
      },
    );
  };
}

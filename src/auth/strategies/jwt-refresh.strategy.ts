import { ExtractJwt, Strategy } from 'passport-jwt';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { UserService } from 'src/user/user.service';
import { UserEntity } from 'src/user/user.entity';
import { ConfigService } from '@nestjs/config';

/** 
@export

@class JutRefreshStrategy - Custom passport strategy to validate a refresh token to allow access to refreshing an expired token, * checks if refresh token is in the database and can be mapped to the request user.

* @extends {PassportStrategy (Strategy, 'jwt-refresh')} extends passport strategy to add custom logic

*/

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh',
) {
  constructor(
    private readonly userService: UserService,
    private readonly configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => {
          return request?.cookies?.Refresh;
        },
      ]),
      ignoreExpiration: false,
      passReqToCallback: true,
      secretOrKey: Buffer.from(
        configService.get<string>('jwt.refreshToken.secret'),
        'base64',
      ).toString(), //protect this string, take from ENV file passRegToCallback: true,
    });
  }
  async validate(request: Request, payload: any): Promise<UserEntity> {
    const refreshToken = request.cookies?.Refresh;

    const user = await this.userService.getUserIfRefreshTokenMatches(
      refreshToken,
      payload.userId,
    );
    if (user && user.isActive) return user;
  }
}

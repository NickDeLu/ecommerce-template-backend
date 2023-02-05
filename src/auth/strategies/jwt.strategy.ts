import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { UserService } from 'src/user/user.service';
import { ExtractJwt, Strategy } from 'passport-jwt';

/**
 * @export
 * @class JwtStrategy - Custom passport strategy to validate an access token to allow access to authentication required endpoints,
 * checks if access token whether from a cookie, url query param, or bearer auth header, is valid, if so return the request user object
 * @extends {PassportStrategy(Strategy)} - extends passport strategy to add custom logic
 *
 */
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly userService: UserService,
    private readonly configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        ExtractJwt.fromUrlQueryParameter('token'),
        (request: Request) => {
          return request?.cookies?.Authentication;
        },
        ExtractJwt.fromAuthHeaderAsBearerToken(),
      ]),

      ignoreExpiration: false,
      secretOrKey: Buffer.from(
        configService.get<string>('jwt.accessToken.secret'),
        'base64',
      ).toString(),
    });
  }

  async validate(payload: any) {
    const user = await this.userService.getOneById(payload.userId);
    if (user && user.isActive) return user;
  }
}

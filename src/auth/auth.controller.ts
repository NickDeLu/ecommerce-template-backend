import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBearerAuth,
  ApiBody,
  ApiCookieAuth,
  ApiTags,
} from '@nestjs/swagger';
import LoginUserDto from 'src/user/dto/loginUser.dto';
import RegisterUserDto from 'src/user/dto/registerUser.dto';
import VerifyAccountDto from 'src/auth/dto/VerifyAccount.dto';
import { UserService } from 'src/user/user.service';
import { AuthService } from './auth.service';
import { Role } from './roles/role.enum';
import { Roles } from './roles/roles.decorator';
import { RolesGuard } from './roles/roles.guard';
import { plainToClass } from 'class-transformer';
import { UserEntity } from 'src/user/user.entity';
import RequestWithUser from 'src/user/dto/createUser.dto copy';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
    private readonly configService: ConfigService,
  ) {}

  @Post('register')
  @HttpCode(200)
  async register(@Body() registrationData: RegisterUserDto) {
    return plainToClass(
      UserEntity,
      this.authService.register(registrationData),
    );
  }

  @Post('verify')
  @HttpCode(200)
  async verify(@Body() body: VerifyAccountDto) {
    return this.authService.verifyAccount(body.code, body.userId);
  }

  @Roles(Role.customer)
  @UseGuards(AuthGuard('local'), RolesGuard)
  @Post('login')
  @ApiBody({ type: LoginUserDto })
  login(@Req() req: RequestWithUser, @Res() response: any) {
    const { user } = req;
    const accessTokenCookie = this.authService.getCookieWithJwtAccessToken(
      user.id,
    );
    const { cookie: refreshTokenCookie, refresh_token } =
      this.authService.getCookieWithJwtRefreshToken(user.id);
    this.userService.setCurrentRefreshToken(refresh_token, user.id);
    const tokenExpiry = new Date();
    tokenExpiry.setSeconds(
      tokenExpiry.getSeconds() +
        this.configService.get<number>('jwt.accessToken.expires'),
    );
    response.setHeader('set-cookie', [accessTokenCookie, refreshTokenCookie]);
    response.send({
      user: plainToClass(UserEntity, user),
      access_token_expiry: tokenExpiry.toString(),
    });
  }

  @Roles(Role.customer)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @ApiCookieAuth()
  @ApiBearerAuth()
  @Get('logout')
  async logout(@Req() request: any, @Res() response: any) {
    await this.userService.removeRefreshToken(request.user.id);
    response.setHeader('set-cookie', this.authService.getCookiesForLogOut());
    return response.sendStatus(200);
  }

  @Roles(Role.customer)
  @UseGuards(AuthGuard('jwt-refresh'), RolesGuard)
  @ApiCookieAuth()
  @Get('refresh')
  refreshToken(@Req() request: any, @Res() response: any) {
    const accessTokenCookie = this.authService.getCookieWithJwtAccessToken(
      request.user.id,
    );
    response.setHeader('set-cookie', accessTokenCookie);
    response.sendStatus(200);
  }
}

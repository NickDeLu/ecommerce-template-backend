import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { DatabaseModule } from 'src/database/database.module';
import { MailModule } from 'src/mail/mail.module';
import { userProviders } from 'src/user/user.provider';
import { UserService } from 'src/user/user.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { roleProviders } from './roles/role.provider';
import { JwtRefreshStrategy } from './strategies/jwt-refresh.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';

@Global()
@Module({
  imports: [
    DatabaseModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('jwt.accessToken.secret'),
        signOptions: {
          expiresIn: `${configService.get<number>('jwt.accessToken.expires')}s`,
        },
      }),
    }),
    PassportModule,
    MailModule,
  ],
  controllers: [AuthController],
  providers: [
    ...userProviders,
    UserService,
    ...roleProviders,
    AuthService,
    LocalStrategy,
    JwtStrategy,
    JwtRefreshStrategy,
  ],
  exports: [...roleProviders, AuthService, JwtModule],
})
export class AuthModule {}

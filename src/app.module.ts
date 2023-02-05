import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { AuthService } from './auth/auth.service';
import { UserService } from './user/user.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import configuration from '../config/configuration';
import { JwtStrategy } from './auth/strategies/jwt.strategy';
import { exceptionFilter } from './logs/exceptionFilter.provider';
import { MailModule } from './mail/mail.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [configuration] }),
    DatabaseModule,
    AuthModule,
    UserModule,
    MailModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    AuthService,
    UserService,
    JwtStrategy,
    ...exceptionFilter,
  ],
})
export class AppModule {}

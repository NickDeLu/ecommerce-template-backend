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
import { exceptionFilter } from './exceptionFilter.provider';
import { MailModule } from './mail/mail.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { LogsController } from './logs/logs.controller';
import * as path from 'path';
import { ScheduleModule } from '@nestjs/schedule';
import { TasksService } from './tasks/tasks.service';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [configuration] }),
    ServeStaticModule.forRoot({
      rootPath: path.join(__dirname, '../../', 'documentation'),
      renderPath: '/api',
    }),
    ScheduleModule.forRoot(),
    DatabaseModule,
    AuthModule,
    UserModule,
    MailModule,
  ],
  controllers: [AppController, LogsController],
  providers: [
    AppService,
    AuthService,
    UserService,
    JwtStrategy,
    ...exceptionFilter,
    TasksService,
  ],
})
export class AppModule {}

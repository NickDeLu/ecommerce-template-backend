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
import { ProductModule } from './product/product.module';
import { AddressModule } from './address/address.module';
import { OrderModule } from './order/order.module';
import { ReviewsModule } from './reviews/reviews.module';
import { PromotionModule } from './promotion/promotion.module';
import { PaymentModule } from './payment/payment.module';
import { CategoryModule } from './category/category.module';
import { AppDataModule } from './app-data/app-data.module';
import { StorageModule } from './storage/storage.module';

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
    ProductModule,
    AddressModule,
    OrderModule,
    ReviewsModule,
    PromotionModule,
    PaymentModule,
    CategoryModule,
    AppDataModule,
    StorageModule,
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

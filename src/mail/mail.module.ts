import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { mailConfigFactory } from './mail.factory';
import { MailerModule } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    MailerModule.forRootAsync({
      imports: [],
      useFactory: mailConfigFactory,
      inject: [ConfigService],
    }),
  ],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}

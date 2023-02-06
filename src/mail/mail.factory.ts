import { ConfigService } from '@nestjs/config';
import * as path from 'path';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { MailerOptions } from '@nestjs-modules/mailer';

export const mailConfigFactory = (
  configService: ConfigService,
): MailerOptions => {
  return {
    transport: {
      rejectUnauthorized: false,
      service: 'gmail',
      secure: false, // in prod remove this
      auth: {
        user: configService.get<string>('mail.email'),
        pass: configService.get<string>('mail.password'),
      },
      tls: {
        rejectUnauthorized: false, //in prod remove this
      },
    },
    defaults: {
      from: `"No Reply" <${configService.get<string>('mail.from')}>`,
    },
    template: {
      dir: path.join(__dirname, '../../../src/mail/templates'),
      adapter: new HandlebarsAdapter(),
      options: {
        strict: true,
      },
    },
  };
};

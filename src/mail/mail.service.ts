import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { UserEntity } from 'src/user/user.entity';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendConfirmedEmail(user: UserEntity) {
    const { email, firstName, lastName } = user;
    await this.mailerService.sendMail({
      to: email,
      subject: 'Thank you! Email Confirmed',
      template: 'confirmed',
      context: {
        fullname: `${firstName} ${lastName}`,
        email,
      },
    });
  }

  async sendConfirmationEmail(user: UserEntity, code: number) {
    const { email, firstName, lastName } = await user;
    await this.mailerService.sendMail({
      to: email,
      subject: 'Welcome! Please Confirm Email',
      template: 'confirm',
      context: {
        fullname: `${firstName} ${lastName}`,
        code,
      },
    });
  }
}

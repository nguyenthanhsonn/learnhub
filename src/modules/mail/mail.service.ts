import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

const nodemailer = require('nodemailer');

@Injectable()
export class MailService {
  constructor(private readonly configService: ConfigService) {}

  async sendPasswordResetOtp(email: string, otp: string): Promise<void> {
    const transporter = nodemailer.createTransport({
      host: this.configService.getOrThrow<string>('EMAIL_HOST'),
      port: this.configService.getOrThrow<number>('EMAIL_PORT'),
      secure: this.configService.get<string>('EMAIL_SECURE') === 'true',
      auth: {
        user: this.configService.getOrThrow<string>('EMAIL_USERNAME'),
        pass: this.configService.getOrThrow<string>('EMAIL_PASSWORD'),
      },
    });

    await transporter.sendMail({
      from: this.configService.getOrThrow<string>('EMAIL_FROM'),
      to: email,
      subject: 'Mã OTP đặt lại mật khẩu LearnHub',
      text: `Mã OTP đặt lại mật khẩu của bạn là: ${otp}. Mã có hiệu lực trong 10 phút.`,
      html: `
        <p>Mã OTP đặt lại mật khẩu của bạn là:</p>
        <h2>${otp}</h2>
        <p>Mã có hiệu lực trong 10 phút.</p>
      `,
    });
  }
}

import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';

import { MailService } from './mail.service';

@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        port: process.env.SMTP_PORT,
        service: 'gmail',
        host: process.env.SMTP_HOST,
        secure: false, // process.env.SMTP_SECURE === 'true',
        auth: {
          type: 'OAuth2',
          user: process.env.SMTP_USER || 'programassmtp@gmail.com',
          // pass: process.env.SMTP_PASS || 'dcczcpxrgfkiolhx',
          accessUrl: 'https://oauth2.googleapis.com/token',
        },
        logger: true,
        debug: true,
      },
      defaults: {
        from: process.env.SMTP_FROM,
      },
    }),
  ],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}

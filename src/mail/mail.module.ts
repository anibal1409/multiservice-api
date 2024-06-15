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
        secure: process.env.SMTP_SECURE === 'true',
        auth: {
          user: process.env.SMTP_USER || 'sigeit.udomonagas@gmail.com',
          pass: process.env.SMTP_PASS || 'dcczcpxrgfkiolhx',
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

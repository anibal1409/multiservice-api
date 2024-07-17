import { createTransport } from 'nodemailer';

import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import {
  recovery,
  welcome,
} from './templates/templates';

@Injectable()
export class MailService {
  private readonly transporter = createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      type: 'OAuth2',
      user: this.configService.get('MAILER_USER'),
      clientId: this.configService.get('MAILER_CLIENT_ID'),
      clientSecret: this.configService.get('MAILER_CLIENT_SECRET'),
      accessUrl: 'https://oauth2.googleapis.com/token',
    },
  });

  async sendMail(options: { to: string; subject: string; text: string }) {
    await this.transporter.sendMail({
      ...options,
      from: this.configService.get('MAILER_FROM'),
    });
  }
  constructor(
    private mailerService: MailerService,
    private readonly configService: ConfigService,
  ) {}

  /**
   * Funcion para mandar un correo con el token `url_` de recuperacion al `email_` especificado.
   * @param url_ - Url token para recuperar la contraseña
   * @param email_ - El email al que se enviara el url
   * @returns Un boolean indicando el exito o fracaso al enviar el correo
   */
  async sendRecovery(url_: string, email_: string): Promise<boolean> {
    try {
      await this.mailerService.sendMail({
        to: email_,
        subject: 'Laboratorio BRIMON - Solicitud de cambio de contraseña',
        html: recovery(url_),
      });
    } catch (error) {
      console.log(error);
      return false;
    }

    return true;
  }

  async sendWelcome(
    email_: string,
    user_: string,
    role_: string,
    password_: string
  ): Promise<boolean> {
    try {
      // await this.sendMail({
      //   subject: `${this.configService.get('COMPANY_NAME')} - Bienvenido`,
      //   text: welcome(
      //     email_,
      //     user_,
      //     role_,
      //     password_,
      //     'http://localhost:4200/login',
      //   ),
      //   to: email_,
      // });
      await this.mailerService.sendMail({
        to: email_,
        subject: `${this.configService.get('COMPANY_NAME')} - Bienvenido`,
        html: welcome(
          email_,
          user_,
          role_,
          password_,
          'http://localhost:4200/login',
        ),
        from: this.configService.get('MAILER_FROM'),
      });
    } catch (error) {
      console.log(3333, error);
      return false;
    }

    return true;
  }
}

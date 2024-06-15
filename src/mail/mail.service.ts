import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

import {
  recovery,
  welcome,
} from './templates/templates';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

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
      await this.mailerService.sendMail({
        to: email_,
        subject: 'Laboratorio BRIMON  - Bienvenido',
        html: welcome(
          email_,
          user_,
          role_,
          password_,
          'http://localhost:4200/login',
        ),
      });
    } catch (error) {
      console.log(3333, error);
      return false;
    }

    return true;
  }
}

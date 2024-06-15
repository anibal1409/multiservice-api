import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { MailService } from '../../mail/mail.service';
import { UsersService } from '../../repositories/users';
import { JwtAuthService } from '../jwt-auth';
import { JWT_CONST } from '../jwt-auth/constants';
import {
  RecoveryPasswordDto,
  RecoveryPasswordResponseDto,
} from './dto/recovery-password.dto';

@Injectable()
export class RecoveryPasswordService {
  constructor(
    @Inject(forwardRef(() => UsersService))
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly jwtAuthService: JwtAuthService,
    @Inject(forwardRef(() => MailService))
    private readonly mailService: MailService,
  ) {}

  /**
   * Funcion que genera el token url y envia el url al email para posterior recuperacion de contraseña.
   * @param recoveryPasswordDto - DTO conformado por el email del usuario que desea recuperar la contraseña
   * @returns Estado al finalizar la funcion de generacion
   */
  async generateRecovery(
    recoveryPasswordDto: RecoveryPasswordDto,
  ): Promise<RecoveryPasswordResponseDto> {
    const user = await this.usersService.findOneByEmail(
      recoveryPasswordDto.email,
    );

    if (!user) {
      throw new BadRequestException('Email no registrado.');
    }

    const payload = { username: user.email, sub: user.id };

    const token = await this.jwtService.signAsync(payload, {
      secret: JWT_CONST.secret,
      expiresIn: JWT_CONST.expiresIn, // 10min
    });

    const _link = `http://localhost:4200/reset-password/${token}`;

    const _isSent = await this.mailService.sendRecovery(_link, user.email);

    if (_isSent) {
      return { message: `Se ha enviado el link de recuperación al correo.` };
    } else {
      throw new BadRequestException('No se ha podido enviar el correo.');
    }
  }

  /**
   * Analiza un token y verifica si aun es valido
   * @param _token - JSON Web Token a verificar
   */
  async check(_token: string): Promise<RecoveryPasswordResponseDto> {
    const _res = await this.jwtAuthService.decode(_token);
    if (_res) {
      return { message: 'Token valido.' };
    }
  }

  async recovery(
    _token: string,
    _newPassword: string,
  ): Promise<RecoveryPasswordResponseDto> {
    const { username: email, sub: id } =
      await this.jwtAuthService.decode(_token);

    const response = await this.usersService.changePassword(
      email,
      id,
      _newPassword,
    );

    if (response) {
      return { message: 'Contraseña cambiada.' };
    } else {
      return { message: 'Error al cambiar la contraseña.' };
    }
  }
}

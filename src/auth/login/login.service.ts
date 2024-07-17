import { Response } from 'express';

import {
  forwardRef,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { UsersService } from '../../repositories/users';
import { getDefaultCokieOptions } from '../cookies';
import { JWT_CONST } from '../jwt-auth/constants';
// eslint-disable-next-line prettier/prettier
import { JwtAuthService } from '../jwt-auth/jwt-auth.service';
import { comparePassword } from '../password-hasher';
// eslint-disable-next-line prettier/prettier
import {
  LoginUserResponseDto,
  UserLoginDto,
} from './dto';

@Injectable()
export class LoginService {
  constructor(
    @Inject(forwardRef(() => UsersService))
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly jwtAuthService: JwtAuthService,
  ) {}

  async login(
    user: UserLoginDto,
    res: Response,
  ): Promise<LoginUserResponseDto> {
    const payload = { username: user.email, sub: user.id };

    const _token = await this.jwtService.signAsync(payload, {
      secret: JWT_CONST.secret,
      expiresIn: JWT_CONST.expiresIn,
    });

    const { email, id, role, firstName, lastName, idDocument } =
      await this.usersService.findOneByEmail(user.email);

    const secretData = {
      token: _token,
      id,
      email,
    };

    const _expiredTime = parseInt(
      (await this.jwtAuthService.decode(_token)).exp + '000',
    );

    res.cookie('app-cookie', secretData, { ...getDefaultCokieOptions() });

    return {
      email,
      id,
      role,
      firstName,
      lastName,
      idDocument,
      loginStamp: _expiredTime,
    };
  }

  async validateUser(email_: string, password_: string): Promise<UserLoginDto> {
    const user = await this.usersService.findOneByEmail(email_);

    if (!user || !(await comparePassword(password_, user.password))) {
      throw new UnauthorizedException('Usuario o contraseña inválida.');
    }

    return { email: user.email, id: user.id };
  }
}

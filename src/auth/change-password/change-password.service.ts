// eslint-disable-next-line prettier/prettier
import {
  forwardRef,
  Inject,
  Injectable,
} from '@nestjs/common';

import { UsersService } from '../../repositories/users';
import { JwtAuthService } from '../jwt-auth';
import { ChangePasswordResponseDto } from './dto';

@Injectable()
export class ChangePasswordService {
  constructor(
    @Inject(forwardRef(() => UsersService))
    private readonly usersService: UsersService,
    private readonly jwtAuthService: JwtAuthService,
  ) {}
  async changePassword(
    token_: string,
    newPassword_: string,
  ): Promise<ChangePasswordResponseDto> {
    const { username: email, sub: id } =
      await this.jwtAuthService.decode(token_);

    const response = await this.usersService.changePassword(
      email,
      id,
      newPassword_,
    );

    if (response) {
      return { message: 'Contraseña cambiada.' };
    } else {
      return { message: 'Error al cambiar la contraseña.' };
    }
  }
}

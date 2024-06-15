// eslint-disable-next-line prettier/prettier
import {
  JsonWebTokenError,
  TokenExpiredError,
} from 'jsonwebtoken';

// eslint-disable-next-line prettier/prettier
import {
  BadRequestException,
  Injectable,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { JWT_CONST } from './constants';
import { JwtResult } from './jwt-result';

@Injectable()
export class JwtAuthService {
  constructor(private jwtService: JwtService) {}

  /**
 // eslint-disable-next-line prettier/prettier
 * Decodifica un token de JWT y obtiene el email (username) y el userId (sub);
 * @param token_ - Token para ser decodificado
 * @returns
 */
  async decode(token_: string): Promise<JwtResult> {
    try {
      return await this.jwtService.verifyAsync(token_, {
        secret: JWT_CONST.secret,
      });
    } catch (error) {
      if (error instanceof TokenExpiredError) {
        throw new BadRequestException('Ha expirado el tiempo del token');
      } else if (error instanceof JsonWebTokenError) {
        throw new BadRequestException('No es un token valido');
      } else {
        // Cualquier otro error
        console.log(error);
        throw new BadRequestException('Ha ocurrido un error');
      }
    }
  }
}

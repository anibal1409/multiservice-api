import { Observable } from 'rxjs';

/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';

import { IS_PUBLIC_KEY } from '../login';

/**
 * Determina el AuthGuard para JWT. Requiere enviar el token (Bearer Token) y ser valido. De lo contrario, retorna `Unauthorized`.
 */
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super();
  }

  private _throwUnauthorized(message: string): never {
    throw new UnauthorizedException(message);
  }

  handleRequest<TUser = any>(
    err: any,
    user: any,
    info: any,
    context: ExecutionContext,
    status?: any,
  ): any {
    if (info instanceof Error) {
      if (info.message == 'No auth token') {
        this._throwUnauthorized('Debe iniciar sesión antes de continuar.');
        //
      } else if (info.name == 'TokenExpiredError') {
        this._throwUnauthorized('Su sesión ha expirado.');
        //
      } else {
        console.log(info);
        this._throwUnauthorized(
          'Algo ha ocurrido. Por favor, inicie sesión nuevamente.',
        );
      }
    }

    super.handleRequest(err, user, info, context, status);
  }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      return true;
    }
    return super.canActivate(context);
  }
}

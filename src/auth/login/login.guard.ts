import { CustomDecorator, Injectable, SetMetadata } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

/**
 * Determina el AuthGuard para Login. Si el usuario y email no coincidden, retorna `Unauthorized`.
 */
@Injectable()
export class LoginAuthGuard extends AuthGuard('local') {}

/**
 * isPublic tag
 */
export const IS_PUBLIC_KEY = 'isPublic';

/**
 * Public decorator para ser usado en todas las rutas que deben ser publicas, es decir, que no requieren estar logeado.
 * @returns
 */
export const Public = (): CustomDecorator => SetMetadata(IS_PUBLIC_KEY, true);

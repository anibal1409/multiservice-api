// eslint-disable-next-line prettier/prettier
import {
  forwardRef,
  Module,
} from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';

import { MailModule } from '../mail';
import { UsersModule } from '../repositories';
import { AuthController } from './auth.controller';
import { ChangePasswordService } from './change-password';
// eslint-disable-next-line prettier/prettier
import {
  JWT_CONST,
  JwtAuthGuard,
} from './jwt-auth';
import { JwtAuthService } from './jwt-auth/jwt-auth.service';
import { LoginService } from './login/login.service';
import { LogoutService } from './logout';
import { RecoveryPasswordService } from './recovery-password';
// eslint-disable-next-line prettier/prettier
import {
  JwtStrategy,
  LocalStrategy,
} from './strategies';

@Module({
  imports: [
    forwardRef(() => UsersModule),
    JwtModule.register({
      global: true,
      secret: JWT_CONST.secret,
      signOptions: { expiresIn: JWT_CONST.expiresIn },
    }),
    MailModule,
  ],
  controllers: [AuthController],
  providers: [
    LoginService,
    JwtAuthService,
    { provide: APP_GUARD, useClass: JwtAuthGuard },
    ChangePasswordService,
    LogoutService,
    RecoveryPasswordService,
    LocalStrategy,
    JwtStrategy,
  ],
  exports: [],
})
export class AuthModule {}

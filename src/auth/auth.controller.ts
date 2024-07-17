// eslint-disable-next-line prettier/prettier
import {
  Request,
  Response,
} from 'express';

import {
  Body,
  Controller,
  forwardRef,
  Get,
  HttpStatus,
  Inject,
  Param,
  Post,
  Put,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
// eslint-disable-next-line prettier/prettier
import {
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { CreateUserDto } from '../repositories/users/dto';
// eslint-disable-next-line prettier/prettier
import { UsersService } from '../repositories/users/users.service';
import {
  ChangePasswordDto,
  ChangePasswordResponseDto,
  ChangePasswordService,
} from './change-password';
import {
  LoginAuthGuard,
  LoginDto,
  LoginService,
  LoginUserResponseDto,
  Public,
  UserLoginDto,
} from './login';
import { LogoutService } from './logout';
import {
  RecoveryPasswordDto,
  RecoveryPasswordResponseDto,
  RecoveryPasswordService,
} from './recovery-password';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly logoutService: LogoutService,
    private readonly recoveryPasswordService: RecoveryPasswordService,
    private readonly changePasswordService: ChangePasswordService,
    private readonly loginService: LoginService,
    @Inject(forwardRef(() => UsersService))
    private readonly usersService: UsersService,
  ) {}

  @Post('login')
  @Public()
  @UseGuards(LoginAuthGuard)
  @ApiResponse({
    type: LoginUserResponseDto,
  })
  login(
    @Body() args: LoginDto,
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ): Promise<LoginUserResponseDto> {
    return this.loginService.login(req.user as UserLoginDto, res);
  }

  @Get('logout')
  @ApiResponse({
    type: undefined,
  })
  logout(@Res({ passthrough: true }) res: Response): Promise<void> {
    return this.logoutService.logout(res);
  }

  @Post('recovery-password')
  @Public()
  @ApiResponse({
    type: RecoveryPasswordDto,
  })
  generateRecovery(
    @Body() recoveryPasswordDto: RecoveryPasswordDto,
  ): Promise<RecoveryPasswordResponseDto> {
    return this.recoveryPasswordService.generateRecovery(recoveryPasswordDto);
  }

  @Post('create-student')
  @Public()
  async createStudent(
    @Body() createUserDto: CreateUserDto,
  ): Promise<HttpStatus> {
    await this.usersService.create(createUserDto);
    return HttpStatus.OK;
  }

  @Get('recovery-password/:recovery_token')
  @Public()
  @ApiResponse({
    type: RecoveryPasswordResponseDto,
  })
  async getRecoveryById(
    @Param('recovery_token') _token: string,
  ): Promise<RecoveryPasswordResponseDto> {
    return await this.recoveryPasswordService.check(_token);
  }

  @Post('recovery-password/:recovery_token')
  @Public()
  @ApiResponse({
    type: RecoveryPasswordResponseDto,
  })
  postRecoveryById(
    @Param('recovery_token') _token: string,
    @Body() body: ChangePasswordDto,
  ): Promise<RecoveryPasswordResponseDto> {
    return this.recoveryPasswordService.recovery(_token, body.newPassword);
  }

  @Put('change-password')
  @ApiResponse({
    type: ChangePasswordResponseDto,
  })
  async changePassword(
    @Req() req: Request,
    @Body() body: ChangePasswordDto,
  ): Promise<ChangePasswordResponseDto> {
    const token = req.cookies['app-cookie'].token;

    return await this.changePasswordService.changePassword(
      token,
      body.newPassword,
    );
  }
}

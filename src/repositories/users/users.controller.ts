import { Request } from 'express';

import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Req,
} from '@nestjs/common';
// eslint-disable-next-line prettier/prettier
import {
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { Public } from '../../auth/login/login.guard';
import {
  ChangePasswordUserDto,
  UserRespondeDto,
} from './dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @Public()
  @ApiResponse({
    type: UserRespondeDto,
  })
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Post('profile')
  @ApiResponse({
    type: UserRespondeDto,
  })
  updateProfile(@Req() request: Request, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(
      +request.cookies?.['app-cookie']?.id,
      updateUserDto,
    );
  }

  @Post('profile/change-password')
  @ApiResponse({
    type: UserRespondeDto,
  })
  changePassword(
    @Req() request: Request,
    @Body() changePasswordUserDto: ChangePasswordUserDto,
  ) {
    return this.usersService.updatePassword(
      +request.cookies?.['app-cookie']?.id,
      request.cookies?.['app-cookie']?.email,
      changePasswordUserDto,
    );
  }

  @Get()
  @ApiResponse({
    type: UserRespondeDto,
    isArray: true,
  })
  findAll(@Req() request: Request) {
    return this.usersService.findAll(+request.cookies?.['app-cookie']?.id);
  }

  @Get('profile')
  @ApiResponse({
    type: UserRespondeDto,
  })
  findProfile(@Req() request: Request) {
    return this.usersService.findOne(+request.cookies?.['app-cookie']?.id);
  }

  @Get(':id')
  @ApiResponse({
    type: UserRespondeDto,
  })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  @ApiResponse({
    type: UserRespondeDto,
  })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  @ApiResponse({
    type: UserRespondeDto,
  })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.remove(+id);
  }
}

// eslint-disable-next-line prettier/prettier
import {
  Not,
  Repository,
} from 'typeorm';

import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { hashPassword } from '../../auth/password-hasher';
import { CrudRepository } from '../../common/use-case';
import { MailService } from '../../mail';
import { CustomersService } from '../customers/customers.service';
import { UserRespondeDto } from './dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities';
import { USER_ROLES_LIST } from './enums';

@Injectable()
export class UsersService implements CrudRepository<User> {
  constructor(
    @InjectRepository(User)
    private readonly repository: Repository<User>,
    private readonly mailService: MailService,
    private readonly patientsService: CustomersService,
  ) {}

  async findValid(id: number): Promise<User> {
    const entity = await this.repository.findOne({
      where: {
        id,
      },
      relations: ['patient'],
    });
    if (!entity) {
      throw new NotFoundException('Usuario no encontrado');
    }
    return entity;
  }

  async findOne(id: number): Promise<UserRespondeDto> {
    const entity = await this.findValid(id);
    return new UserRespondeDto(entity);
  }

  async findOneByEmail(email: string): Promise<User> {
    return this.repository.findOne({
      where: {
        email,
      },
    });
  }

  async findOneByIdDocument(idDocument: string, role?: string): Promise<User> {
    return this.repository.findOne({
      where: {
        idDocument,
        role: role || null,
      },
    });
  }

  async create(creatrDto: CreateUserDto): Promise<UserRespondeDto> {
    const UserEmail = await this.findOneByEmail(creatrDto.email);
    if (UserEmail) {
      if (UserEmail.deleted) {
        throw new BadRequestException(
          'El usuario con este correo electrónico fue eliminado previamente.',
        );
      }

      throw new BadRequestException('E-mail en uso');
    }

    const userIdDocument = await this.findOneByIdDocument(
      creatrDto.idDocument,
      creatrDto.role,
    );
    if (userIdDocument && userIdDocument.idDocument === creatrDto.idDocument) {
      if (userIdDocument.deleted) {
        throw new BadRequestException(
          'El usuario con este documento fue eliminado previamente.',
        );
      }

      throw new BadRequestException('Documento en uso');
    }

    const passwordDefault = (
      await hashPassword(Date.now().toString())
    ).substring(0, 10);

    const user = this.repository.create({
      email: creatrDto.email,
      password: await hashPassword(passwordDefault),
      lastName: creatrDto.lastName,
      firstName: creatrDto.firstName,
      role: creatrDto.role,
      idDocument: creatrDto.idDocument,
      birthdate: creatrDto.birthdate,
    });

    console.log(user);

    const _userRes = await this.repository.save(user);

    await this.mailService.sendWelcome(
      creatrDto.email,
      `${creatrDto.lastName} ${creatrDto.firstName}`,
      USER_ROLES_LIST[_userRes.role] || '',
      passwordDefault,
    );

    return new UserRespondeDto(_userRes);
  }

  async findAll(userId: number): Promise<Array<UserRespondeDto>> {
    const data = await this.repository.find({
      where: {
        id: Not(userId),
        deleted: false,
      },
      order: {
        lastName: 'ASC',
      },
    });

    return data.map((item) => new UserRespondeDto(item));
  }

  async update(
    id: number,
    updateUserDto: UpdateUserDto,
  ): Promise<UserRespondeDto> {
    const user = await this.findValid(id);
    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }
    const userIdDocument = await this.findOneByIdDocument(
      updateUserDto.idDocument,
      updateUserDto.role,
    );
    if (
      userIdDocument &&
      userIdDocument.id !== id &&
      userIdDocument.idDocument === updateUserDto.idDocument
    ) {
      if (userIdDocument.deleted) {
        throw new BadRequestException(
          'El usuario con este documento fue eliminado previamente.',
        );
      }

      throw new BadRequestException('Documento en uso');
    }

    const _userRes = await this.repository.save({
      id,
      email: updateUserDto?.email,
      lastName: updateUserDto?.lastName,
      firstName: updateUserDto?.firstName,
      status: updateUserDto?.status,
      role: updateUserDto?.role,
      idDocument: updateUserDto.idDocument,
      birthdate: updateUserDto.birthdate,
    });

    return new UserRespondeDto(_userRes);
  }

  async remove(id: number): Promise<UserRespondeDto> {
    const user = await this.findValid(id);
    user.deleted = true;
    return new UserRespondeDto(await this.repository.save(user));
  }

  async changePassword(
    email: string,
    id: number,
    newPassword: string,
  ): Promise<boolean> {
    if (!newPassword) {
      throw new BadRequestException('Contrasena requerida');
    }

    const user = await this.findOneByEmail(email);
    if (!user) {
      throw new NotFoundException(`Usuario no encontrado`);
    }

    if (user.email != email || user.id != id) {
      throw new BadRequestException('E-mail o ID es invalido');
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _oldPassword, ...response } = user;

    await this.repository.save({
      password: await hashPassword(newPassword),
      ...response,
    });

    return true;
  }

  async count(): Promise<number> {
    return await this.repository.count({
      where: {
        deleted: false,
      },
    });
  }
}

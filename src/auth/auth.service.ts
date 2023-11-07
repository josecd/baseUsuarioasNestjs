/* eslint-disable prettier/prettier */
import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/modules/users/entities/user.entity';
import * as bcrypt from 'bcrypt';
import { RegisterDto } from './dto/register.dto';
import { UsersService } from 'src/modules/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepositorio: Repository<User>,
    private readonly usersService: UsersService,
    private jwtService: JwtService,
  ) { }

  async signIn(correo: string, pass: string): Promise<any> {

    const user = await this.userRepositorio.findOne({
      where: {
        email: correo,
      },
    });

    const isPasswordMatching = await bcrypt.compare(pass, user.password);
    console.log(isPasswordMatching);
    
    if (!isPasswordMatching) {
      throw new UnauthorizedException();
    }

    const { password, ...result } = user;

    const payload = { sub: user.id, username: user.email };
    return {
      access_token: await this.jwtService.signAsync(payload),
      user: {
        idUsuario: user.id,
        nombre: user.name,
        correo: user.email,
      },
    };

    return result;
  }

  public async register(registrationData: RegisterDto) {
    const hashedPassword = await bcrypt.hash(registrationData.password, 10);
    try {
      const createdUser = await this.usersService.create({
        ...registrationData,
        password: hashedPassword
      });
      createdUser.password = undefined;
      return createdUser;
    } catch (error) {
      throw new HttpException('Algo salió mal', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

}

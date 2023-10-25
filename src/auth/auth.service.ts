import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/modules/users/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepositorio: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async signIn(correo: string, pass: string): Promise<any> {
    const user = await this.userRepositorio.findOne({
      where: {
        email: correo,
        password: pass,
      },
      relations: ['perfil'],
    });
    if (user?.password !== pass) {
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
        // perfil: user.perfil,
      },
    };

    return result;
  }
}

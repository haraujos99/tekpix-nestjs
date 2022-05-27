import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { DataBaseService } from 'src/database/database.service';
import { AuthType } from './auth.type';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService, private db: DataBaseService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const Authorization = request.headers['authorization'];

    if (!Authorization) {
      throw new UnauthorizedException('Autorização não informada.');
    }

    try {
      const token = Authorization.split(' ')[1];

      this.jwtService.verify(token);

      const data = this.jwtService.decode(token) as AuthType;

      request.auth = data;

      const user = await this.db.funcionarios.findUnique({
        where: {
          id: Number(data.id),
        },
      });

      delete user.senha;

      request.user = user;

      if (!user) {
        throw new UnauthorizedException('Usuário não encontrado.');
      }

      return true;
    } catch (e) {
      throw new UnauthorizedException(e.message);
    }
  }
}

import { BadRequestException, Injectable } from '@nestjs/common';
import { EmployeesService } from 'src/employees/employees.service';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private employeesService: EmployeesService,
    private jwtService: JwtService,
  ) {}

  async login({ email, senha }: LoginDto) {
    const user = await this.employeesService.getByEmail(email);
    if (!user) {
      throw new BadRequestException('Usuario ou senha inválido');
    }

    const checkPassword = await bcrypt.compare(senha, user.senha);

    if (!checkPassword) {
      throw new BadRequestException('Usuario ou senha inválido');
    }

    const token = this.jwtService.sign({
      id: user.id,
      email: user.email,
      nome: user.nome,
    });
    delete user.senha;

    return {
      user,
      token,
    };
  }
}

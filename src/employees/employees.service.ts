import { BadRequestException, Injectable } from '@nestjs/common';
import { DataBaseService } from 'src/database/database.service';
import { CreateEmployeeDto } from './dto/employee.create.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class EmployeesService {
  constructor(private db: DataBaseService) {}

  validate(data: CreateEmployeeDto) {
    if (!data.nome) {
      throw new BadRequestException('Informe o nome do funcionário.');
    }
    if (!data.cpf) {
      throw new BadRequestException('Informe o cpf do funcionário.');
    }
    if (!data.email) {
      throw new BadRequestException('Informe o email do funcionario.');
    }
    if (!data.senha) {
      throw new BadRequestException('Informe a senha do funcionario.');
    }

    return data;
  }

  async getByEmail(email: string) {
    const funcionario = await this.db.funcionarios.findUnique({
      where: {
        email,
      },
    });

    return funcionario;
  }

  async create(data: CreateEmployeeDto) {
    this.validate(data);
    const salt = bcrypt.genSaltSync(10);

    const user = await this.db.funcionarios.create({
      data: {
        nome: data.nome,
        cpf: data.cpf,
        email: data.email,
        senha: bcrypt.hashSync(data.senha, salt),
      },
    });

    delete user.senha;
    return user;
  }
}

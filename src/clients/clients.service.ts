import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { CreateClientsDto } from './dto/clients.create.dto';
import { UpdateClientsDto } from './dto/clients.update.dto';
import { DataBaseService } from 'src/database/database.service';

@Injectable()
export class ClientsService {
  constructor(private db: DataBaseService) {}

  validate(data: CreateClientsDto) {
    if (!data.nome) {
      throw new BadRequestException('Informe o nome do cliente.');
    }
    if (!data.cpf) {
      throw new BadRequestException('Informe o CPF do cliente.');
    }
    if (data.cpf.length != 11) {
      throw new BadRequestException('CPF inválido');
    }

    return data;
  }

  getId(id: number) {
    id = Number(id);

    if (isNaN(id)) {
      throw new BadRequestException('ID inválido');
    }

    return id;
  }

  async create(data: CreateClientsDto) {
    this.validate(data);

    return await this.db.clientes.create({
      data,
    });
  }

  async read() {
    return await this.db.clientes.findMany();
  }

  async findOne(id: number) {
    const client = await this.db.clientes.findUnique({ where: { id } });

    if (!client) {
      throw new NotFoundException('Cliente não existe.');
    }

    return client;
  }

  update(id: number, data: UpdateClientsDto) {
    this.validate(data);

    return this.db.categorias.update({
      where: {
        id: this.getId(id),
      },
      data,
    });
  }

  async delete(id: number) {
    await this.getId(id);

    return this.db.categorias.delete({
      where: {
        id: this.getId(id),
      },
    });
  }
}

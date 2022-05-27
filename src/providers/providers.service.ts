import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { CreateProvidersDto } from './dto/providers.create.dto';
import { UpdateProvidersDto } from './dto/providers.update.dto';
import { DataBaseService } from 'src/database/database.service';

@Injectable()
export class ProvidersService {
  constructor(private db: DataBaseService) {}

  validate(data: CreateProvidersDto) {
    if (!data.nome) {
      throw new BadRequestException('Informe o nome do fornercedor.');
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

  async create(data: CreateProvidersDto) {
    this.validate(data);

    return await this.db.categorias.create({
      data,
    });
  }

  async read() {
    return await this.db.fornecedores.findMany();
  }

  async findOne(id: number) {
    const provider = await this.db.fornecedores.findUnique({ where: { id } });

    if (!provider) {
      throw new NotFoundException('Categoria não existe.');
    }

    return provider;
  }

  update(id: number, data: UpdateProvidersDto) {
    this.validate(data);

    return this.db.fornecedores.update({
      where: {
        id: this.getId(id),
      },
      data,
    });
  }

  async delete(id: number) {
    await this.getId(id);

    return this.db.fornecedores.delete({
      where: {
        id: this.getId(id),
      },
    });
  }
}

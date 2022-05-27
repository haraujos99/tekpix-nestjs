import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { CreateSalesDto } from './dto/sales.create.dto';
import { UpdateSalesDto } from './dto/sales.update.dto';
import { DataBaseService } from 'src/database/database.service';

@Injectable()
export class SalesService {
  constructor(private db: DataBaseService) {}

  validate(data: CreateSalesDto) {
    if (!data.produto_id) {
      throw new BadRequestException('Informe o produto vendido.');
    }
    if (!data.cliente_id) {
      throw new BadRequestException('Informe o cliente.');
    }
    if (!data.funcionario_id) {
      throw new BadRequestException('Informe o funcionario.');
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

  async create(data: CreateSalesDto) {
    this.validate(data);

    return await this.db.vendas.create({
      data,
    });
  }

  async read() {
    return await this.db.vendas.findMany();
  }

  async findOne(id: number) {
    const provider = await this.db.vendas.findUnique({ where: { id } });

    if (!provider) {
      throw new NotFoundException('Categoria não existe.');
    }

    return provider;
  }

  update(id: number, data: UpdateSalesDto) {
    this.validate(data);

    return this.db.vendas.update({
      where: {
        id: this.getId(id),
      },
      data,
    });
  }

  async delete(id: number) {
    await this.getId(id);

    return this.db.vendas.delete({
      where: {
        id: this.getId(id),
      },
    });
  }
}

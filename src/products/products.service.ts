import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { CreateProductsDto } from './dto/products.create.dto';
import { UpdateProductsDto } from './dto/products.update.dto';
import { DataBaseService } from 'src/database/database.service';

@Injectable()
export class ProductsService {
  constructor(private db: DataBaseService) {}

  validate(data: CreateProductsDto) {
    if (!data.nome) {
      throw new BadRequestException('Informe o nome do produto.');
    }
    if (!data.categoria_id) {
      throw new BadRequestException('Informe a categoria do produto.');
    }
    if (!data.fornecedor_id) {
      throw new BadRequestException('Informe o fornecedor do produto.');
    }
    if (!data.preco) {
      throw new BadRequestException('Informe o preco do produto.');
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

  async create(data: CreateProductsDto) {
    this.validate(data);

    return await this.db.produtos.create({
      data,
    });
  }

  async read() {
    return await this.db.produtos.findMany();
  }

  async findOne(id: number) {
    const provider = await this.db.produtos.findUnique({ where: { id } });

    if (!provider) {
      throw new NotFoundException('Categoria não existe.');
    }

    return provider;
  }

  update(id: number, data: UpdateProductsDto) {
    this.validate(data);

    return this.db.produtos.update({
      where: {
        id: this.getId(id),
      },
      data,
    });
  }

  async delete(id: number) {
    await this.getId(id);

    return this.db.produtos.delete({
      where: {
        id: this.getId(id),
      },
    });
  }
}

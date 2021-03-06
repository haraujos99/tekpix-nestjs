import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { CreateCategoriesDto } from './dto/categories.create.dto';
import { UpdateCategoriesDto } from './dto/categories.update.dto';
import { DataBaseService } from 'src/database/database.service';

@Injectable()
export class CategoriesService {
  constructor(private db: DataBaseService) {}

  validate(data: CreateCategoriesDto) {
    if (!data.nome) {
      throw new BadRequestException('Informe o nome da categoria.');
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

  async create(data: CreateCategoriesDto) {
    this.validate(data);

    return await this.db.categorias.create({
      data,
    });
  }

  async read() {
    return await this.db.categorias.findMany();
  }

  async findOne(id: number) {
    const category = await this.db.categorias.findUnique({ where: { id } });

    if (!category) {
      throw new NotFoundException('Categoria não existe.');
    }

    return category;
  }

  update(id: number, data: UpdateCategoriesDto) {
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

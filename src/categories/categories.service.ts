import { Injectable } from '@nestjs/common';
import { CreateCategoriesDto } from './dto/categories.create.dto';
import { UpdateCategoriesDto } from './dto/categories.update.dto';
import { DataBaseService } from 'src/database/database.service';

@Injectable()
export class CategoriesService {

  constructor(private db: DataBaseService) {}

  create(category: CreateCategoriesDto) {}

  async read() {
    return await this.db.categorias.findMany();
  }

  findOne(id: number) {}

  update(id: number, category: UpdateCategoriesDto) {}

  delete(id: number) {}
}

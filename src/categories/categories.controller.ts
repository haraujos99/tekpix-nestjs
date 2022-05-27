import {
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Param,
  Body,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { CategoriesService } from './categories.service';
import { CreateCategoriesDto } from './dto/categories.create.dto';
import { UpdateCategoriesDto } from './dto/categories.update.dto';

@Controller('categories')
export class CategoriesController {
  constructor(private categoriesService: CategoriesService) {}

  @UseGuards(AuthGuard)
  @Post()
  create(@Body() category: CreateCategoriesDto) {
    return this.categoriesService.create(category);
  }

  @UseGuards(AuthGuard)
  @Get()
  read() {
    return this.categoriesService.read();
  }

  @UseGuards(AuthGuard)
  @Get(':/id')
  show(@Param('id') id) {
    return this.categoriesService.findOne(+id);
  }

  @UseGuards(AuthGuard)
  @Put('/:id')
  update(@Param('id') id, @Body() category: UpdateCategoriesDto) {
    return this.categoriesService.update(+id, category);
  }

  @Delete('/:id')
  delete(@Param('id') id) {
    return this.categoriesService.delete(+id);
  }
}

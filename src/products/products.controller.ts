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
import { ProductsService } from './products.service';
import { CreateProductsDto } from './dto/products.create.dto';
import { UpdateProductsDto } from './dto/products.update.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @UseGuards(AuthGuard)
  @Post()
  create(@Body() product: CreateProductsDto) {
    return this.productsService.create(product);
  }

  @UseGuards(AuthGuard)
  @Get()
  read() {
    return this.productsService.read();
  }

  @UseGuards(AuthGuard)
  @Get(':/id')
  show(@Param('id') id) {
    return this.productsService.findOne(+id);
  }

  @UseGuards(AuthGuard)
  @Put('/:id')
  update(@Param('id') id, @Body() category: UpdateProductsDto) {
    return this.productsService.update(+id, category);
  }

  @UseGuards(AuthGuard)
  @Delete('/:id')
  delete(@Param('id') id) {
    return this.productsService.delete(+id);
  }
}

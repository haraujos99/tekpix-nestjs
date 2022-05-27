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
import { SalesService } from './sales.service';
import { CreateSalesDto } from './dto/sales.create.dto';
import { UpdateSalesDto } from './dto/sales.update.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('sales')
export class SalesController {
  constructor(private salesService: SalesService) {}

  @UseGuards(AuthGuard)
  @Post()
  create(@Body() sale: CreateSalesDto) {
    return this.salesService.create(sale);
  }

  @UseGuards(AuthGuard)
  @Get()
  read() {
    return this.salesService.read();
  }

  @UseGuards(AuthGuard)
  @Get(':/id')
  show(@Param('id') id) {
    return this.salesService.findOne(+id);
  }

  @UseGuards(AuthGuard)
  @Put('/:id')
  update(@Param('id') id, @Body() sale: UpdateSalesDto) {
    return this.salesService.update(+id, sale);
  }

  @UseGuards(AuthGuard)
  @Delete('/:id')
  delete(@Param('id') id) {
    return this.salesService.delete(+id);
  }
}

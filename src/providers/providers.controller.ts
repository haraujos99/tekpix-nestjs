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
import { ProvidersService } from './providers.service';
import { CreateProvidersDto } from './dto/providers.create.dto';
import { UpdateProvidersDto } from './dto/providers.update.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('providers')
export class ProvidersController {
  constructor(private providersService: ProvidersService) {}

  @UseGuards(AuthGuard)
  @Post()
  create(@Body() provider: CreateProvidersDto) {
    return this.providersService.create(provider);
  }

  @UseGuards(AuthGuard)
  @Get()
  read() {
    return this.providersService.read();
  }

  @UseGuards(AuthGuard)
  @Get(':/id')
  show(@Param('id') id) {
    return this.providersService.findOne(+id);
  }

  @UseGuards(AuthGuard)
  @Put('/:id')
  update(@Param('id') id, @Body() provider: UpdateProvidersDto) {
    return this.providersService.update(+id, provider);
  }

  @UseGuards(AuthGuard)
  @Delete('/:id')
  delete(@Param('id') id) {
    return this.providersService.delete(+id);
  }
}

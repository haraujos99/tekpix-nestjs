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
import { ClientsService } from './clients.service';
import { CreateClientsDto } from './dto/clients.create.dto';
import { UpdateClientsDto } from './dto/clients.update.dto';

@Controller('clients')
export class ClientsController {
  constructor(private clientsService: ClientsService) {}

  @UseGuards(AuthGuard)
  @Post()
  create(@Body() client: CreateClientsDto) {
    return this.clientsService.create(client);
  }

  @UseGuards(AuthGuard)
  @Get()
  read() {
    return this.clientsService.read();
  }

  @UseGuards(AuthGuard)
  @Get(':/id')
  show(@Param('id') id) {
    return this.clientsService.findOne(+id);
  }

  @UseGuards(AuthGuard)
  @Put('/:id')
  update(@Param('id') id, @Body() client: UpdateClientsDto) {
    return this.clientsService.update(+id, client);
  }

  @UseGuards(AuthGuard)
  @Delete('/:id')
  delete(@Param('id') id) {
    return this.clientsService.delete(+id);
  }
}

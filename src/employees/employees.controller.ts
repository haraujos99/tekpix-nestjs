import {
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { CreateEmployeeDto } from './dto/employee.create.dto';
import { EmployeesService } from './employees.service';

@Controller('employees')
export class EmployeesController {
  constructor(private employeesService: EmployeesService) {}

  @Post()
  async createUser(@Body() employee: CreateEmployeeDto) {
    return this.employeesService.create(employee);
  }
}

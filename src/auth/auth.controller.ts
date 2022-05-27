import { Body, Controller, Post } from '@nestjs/common';
import { CreateEmployeeDto } from 'src/employees/dto/employee.create.dto';
import { EmployeesService } from 'src/employees/employees.service';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private employeesService: EmployeesService,
  ) {}

  @Post('register')
  async createUser(@Body() employee: CreateEmployeeDto) {
    return this.employeesService.create(employee);
  }

  @Post('login')
  async login(@Body() body: LoginDto) {
    return this.authService.login(body);
  }
}

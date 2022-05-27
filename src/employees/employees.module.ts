import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { DataBaseService } from 'src/database/database.service';
import { EmployeesController } from './employees.controller';
import { EmployeesService } from './employees.service';

@Module({
  imports: [DatabaseModule],
  controllers: [EmployeesController],
  providers: [EmployeesService],
  exports: [EmployeesService],
})
export class EmployeesModule {}

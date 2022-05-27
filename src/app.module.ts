import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CategoriesModule } from './categories/categories.module';
import { ClientsModule } from './clients/clients.module';
import { ProductsModule } from './products/products.module';
import { ProvidersModule } from './providers/providers.module';
import { SalesModule } from './sales/sales.module';
import { EmployeesModule } from './employees/employees.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    CategoriesModule,
    ClientsModule,
    ProvidersModule,
    ProductsModule,
    SalesModule,
    EmployeesModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

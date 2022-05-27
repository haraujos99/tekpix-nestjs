import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { DatabaseModule } from 'src/database/database.module';
import { EmployeesModule } from 'src/employees/employees.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [
    JwtModule.registerAsync({
      useFactory: () => ({
        secret: process.env.JWT_SECRET,
        signOptions: {
          expiresIn: `${process.env.JWT_EXPIRES_IN} s`,
        },
      }),
    }),
    EmployeesModule,
    DatabaseModule,
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}

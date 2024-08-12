import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { StaffModule } from '../staff/staff.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './common/constants/constant';

@Module({
  imports:[StaffModule, JwtModule.register({
    global: true,
    secret: process.env.JWT_SECRET,
    signOptions: { expiresIn: process.env.EXPRIRESIN},
  }),],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}

import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { StaffModule } from '../staff/staff.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './common/constants/constant';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports:[ConfigModule.forRoot({
    envFilePath: '.env',  
    isGlobal: true,
  }
  ), StaffModule, JwtModule.register({
    global: true,
    secret: `${process.env.JWT_SECRET}`,
    signOptions: { expiresIn: '12h'},
  })],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}

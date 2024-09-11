import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { StaffService } from '../staff/staff.service';
import { CreateStaffDto } from './dto/create-staff.dto';

@Controller('/api/cocktail/auth/')
export class AuthController {
  constructor(private readonly authService: AuthService,private readonly staffService:StaffService) {}


  @Post('signIn')
  signIn(@Body() login:CreateAuthDto) {
    return this.authService.signIn(login.email,login.password);
  }

  @Post('signUp')
  signUp(@Body() createStaffDto: CreateStaffDto) {
    console.log(createStaffDto);
    return this.staffService.create(createStaffDto);
  }

  @Get('validateToken/:token')
  validatetoken(@Param('token') token:string) {
    console.log(token);
    return this.authService.validateToken(token);
  }

  @Get('getUser/:token')
  getUsertoken(@Param('token') token:string) {
    return this.authService.getUserToken(token);
  }

  
}

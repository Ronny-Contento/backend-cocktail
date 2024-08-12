import { Injectable, UnauthorizedException } from '@nestjs/common';
import { StaffService } from '../staff/staff.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { LoginResponse } from './interface/login-response';
import { jwtConstants } from './common/constants/constant';
import { request } from 'http';

@Injectable()
export class AuthService {
  result:boolean=false;
  userToken:string="";
  constructor(
    private staffService: StaffService,
    private jwtService: JwtService,
  ) {}

  async signIn(email: String, password: String):Promise<LoginResponse> {
    const staff = await this.staffService.findEmail(email);

    const isMatch = await bcrypt.compare(password, staff?.password);

    if (!isMatch) {
      throw new UnauthorizedException("please, check your credentials");
    }

    const payload = { sub: staff.idStaff, email: staff.email };
    const access_token= await this.jwtService.signAsync(payload);

    return { token:access_token,isSuccess:true,message:"operacion exitosa" };
  }

  async validateToken(token:string):Promise<boolean>{
    console.log("validando...token",token);
    
    if(!token){
      return this.result;
    }
    try {
      const payload = await this.jwtService.verifyAsync(
        token,
        {
          secret: jwtConstants.secret
        }
      );
      this.result=true;

    } catch (error) {
      console.error("Error al validar el token:", error); // Mejor manejo de errores
      this.result=false;
     }
    return this.result;
  }
 async getUserToken(token:string):Promise<String>{
  if(!token){
    this.userToken="User doesn't exist";
  }
  try {
    const payload = await this.jwtService.verifyAsync(
      token,
      {
        secret: jwtConstants.secret
      }
    );
    this.userToken=payload;

  } catch (error) {
    console.error("Error al validar el token:", error); // Mejor manejo de errores
    this.userToken="error al validar";
   }
  return this.userToken;
 }
}

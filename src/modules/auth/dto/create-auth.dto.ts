import { IsEmail, IsString } from "class-validator";

export class CreateAuthDto {
    @IsEmail()
    @IsString()
    email:String;

    @IsString()
    password:String;
}

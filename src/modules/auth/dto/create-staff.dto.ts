import { IsEmail, IsOptional, IsString } from "class-validator";

export class CreateStaffDto {
    @IsString()
    firstName: String;

    @IsString()
    lastName: String;

    @IsOptional()
    @IsString()
    photo:String;

    @IsEmail()
    @IsString()
    email:String;

    @IsString()
    password:String;

    @IsString()
    address:String;

    @IsString()
    phone:String;

    @IsString()
    status:String;
}

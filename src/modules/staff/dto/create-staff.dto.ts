import { IsEmail, IsString } from "class-validator";

export class CreateStaffDto {
    @IsString()
    firstName: String;

    @IsString()
    lastName: String;

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

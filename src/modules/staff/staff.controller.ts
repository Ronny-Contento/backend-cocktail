import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, UseInterceptors, UploadedFile } from '@nestjs/common';
import { StaffService } from './staff.service';
import { CreateStaffDto } from './dto/create-staff.dto';
import { UpdateStaffDto } from './dto/update-staff.dto';
import { AuthGuard } from '../auth/common/guards/auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerOptions } from 'src/config/multer/multer.config';
import { v2 as cloudinary } from 'cloudinary';
import * as fs from 'fs';

/* @UseGuards(AuthGuard)//Realizar con roles
 */@Controller('api/cocktail/staff/')
export class StaffController {
  constructor(private readonly staffService: StaffService) {}

  @Get()
  findAll() {
    return this.staffService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    console.log("dsd",id);
    return this.staffService.findOne(+id);
  }
  @Get('filter/:lastName')
  findOneLastName(@Param('lastName') lastName: String) {
    console.log("get",lastName);

    return this.staffService.findOneLastName(lastName);
  }

  @Patch(':id')
  @UseInterceptors(FileInterceptor('file', multerOptions))
  async update(@Param('id') id: string, @Body() updateStaffDto: any, @UploadedFile() file:Express.Multer.File) {
    /* const updateStaffData = JSON.parse(JSON.stringify(updateStaffDto)); */
     /*const formData = new FormData();
    formData.append('staff', JSON.stringify(updateStaffData)); */
    
    const updateStaff = JSON.parse(updateStaffDto.staff);
    if(file){
      const urlImg=await cloudinary.uploader.upload(file.path);
      updateStaff.photo=urlImg.secure_url;
      fs.unlinkSync(file.path);
      return this.staffService.update(+id, updateStaff);
    }else{
      return this.staffService.update(+id, updateStaff);
    }
    
   
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.staffService.delete(+id);
  }
}

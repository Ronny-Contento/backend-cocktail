import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './config/database/database.module';
import { StaffModule } from './modules/staff/staff.module';
import { AuthModule } from './modules/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { CloudinaryModule } from './common/upload/cloudinary/cloudinary.module';

@Module({
  imports: [
  ConfigModule.forRoot({
    envFilePath: '.env',  
    isGlobal: true,
  }
  ),  
  DatabaseModule,StaffModule,AuthModule,CloudinaryModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { StaffService } from './staff.service';
import { StaffController } from './staff.controller';
import { DatabaseModule } from 'src/config/database/database.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StaffEntity } from './entities/staff.entity';


@Module({
  imports:[DatabaseModule,TypeOrmModule.forFeature([StaffEntity])],
  controllers: [StaffController],
  providers: [StaffService],
  exports:[StaffService]
})
export class StaffModule {}

import {
  ConflictException,
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateStaffDto } from './dto/create-staff.dto';
import { UpdateStaffDto } from './dto/update-staff.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { StaffEntity } from './entities/staff.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class StaffService {
  constructor(
    @InjectRepository(StaffEntity)
    private staffRepository: Repository<StaffEntity>,
  ) {}

  async create(createStaffDto: CreateStaffDto) {
    const hashPassword = await this.hashPassword(createStaffDto.password);

    createStaffDto.password = hashPassword;

    const staff = this.staffRepository.create(createStaffDto);
    try {
      return await this.staffRepository.save(staff);
    } catch (error) {
      if (error.code == 'ER_DUP_ENTRY') {
        throw new ConflictException('This email is already registered');
      }

      throw new InternalServerErrorException();
    }
  }

  async hashPassword(password: String) {
    const saltOrRounds = await bcrypt.genSalt();
    const hash = await bcrypt.hash(password, saltOrRounds);
    return hash;
  }

  async findAll() {
    return await this.staffRepository.find();
  }

  async findOne(idStaff: number) {
    return await this.staffRepository.findOneBy({idStaff});
  }
  async findEmail(email: String) {
    return await this.staffRepository.findOne({
      where: {
        email,
      },
    });
  }
  async findOneLastName(lastName: String) {
    console.log("repo",lastName);

    return await this.staffRepository.findOneBy({
      
        lastName,
      
    });
  }

  async update(id: number, updateStaffDto: UpdateStaffDto) {
    return await this.staffRepository.update(id, updateStaffDto);
   }

  async delete(id: number) {
    return await this.staffRepository.delete(id);
  }
}

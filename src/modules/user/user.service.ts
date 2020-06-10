import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../../entities/user.entity';
import { Repository } from 'typeorm';
import { UpdateUserDTO } from '../../models/user.model';

@Injectable()
export class UserService {
  constructor(@InjectRepository(UserEntity)
              private userRepository: Repository<UserEntity>) {
  }

  async findByEmail(email: string): Promise<UserEntity> {
    return this.userRepository.findOne({ where: { email } });
  }

  async updateUser(email: string, data: UpdateUserDTO) {
    await this.userRepository.update({ email }, data);
    return this.findByEmail(email);
  }
}

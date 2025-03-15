import { Inject, Injectable } from '@nestjs/common';
import { User } from './user.entity';
import { UserBodyDto } from './dto/body.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}
  getAll(param) {
    return {
      firstNmae: 'ujjwal',
    };
  }
  async createUser(req: UserBodyDto) {
    const check = await this.userRepository.findOne({
      where: {
        email: req.email,
      },
    });
    if (check) {
      return 'User already exists';
    } else {
      const newUser = this.userRepository.create(req);
      return this.userRepository.save(newUser);
    }
  }
}

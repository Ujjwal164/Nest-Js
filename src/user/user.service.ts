import { Injectable } from '@nestjs/common';
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
  getAll(id: number) {
    return this.userRepository.find({
      where: { id },
      relations: { post: true },
    });
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

  async deleteUser(id: number) {
    return await this.userRepository.delete(id);
  }
}

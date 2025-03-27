import { Inject, Injectable } from '@nestjs/common';
import { User } from './user.entity';
import { UserBodyDto } from './dto/body.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ConfigService, ConfigType } from '@nestjs/config';
import profileConfig from './config/profile.config';

@Injectable()
export class UserService {
  constructor(
    private readonly configService: ConfigService,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    @Inject(profileConfig.KEY)
    private readonly profileConfigService: ConfigType<typeof profileConfig>, // this is used to inject the config from the config file
  ) {}
  getAll(id: number) {
    console.log(this.profileConfigService.profile);
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

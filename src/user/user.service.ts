import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  RequestTimeoutException,
} from '@nestjs/common';
import { User } from './user.entity';
import { UserBodyDto } from './dto/body.dto';
import { DataSource, Repository } from 'typeorm';
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

    private readonly dataSource: DataSource, // we inject the datasource to use it in the service for transaction we use this
  ) {}

  async getAllUser() {
    let users: User[] | null = null;
    try {
      users = await this.userRepository.find({
        relations: { post: true },
      });
    } catch (error) {
      throw new HttpException('Error while fetching users', HttpStatus.GONE);
    }

    if (users.length === 0) {
      throw new BadRequestException('No users found');
    } else {
      return users;
    }
  }

  async getAll(id: number) {
    let user: User | null = null;
    try {
      user = await this.userRepository.findOne({
        where: { id },
        relations: { post: true },
      });
    } catch (error) {
      throw new RequestTimeoutException('Error while fetching user', error);
    }
    if (!user) {
      throw new BadRequestException('User not found');
    } else {
      return user;
    }
  }

  async createUser(req: UserBodyDto) {
    let check: User | null = null;

    try {
      check = await this.userRepository.findOne({
        where: {
          email: req.email,
        },
      });
    } catch (error) {
      throw new RequestTimeoutException(
        'Error while checking for existing user',
        error,
      );
    }

    if (check) {
      throw new BadRequestException('user already exist in our database');
    } else {
      const newUser = this.userRepository.create(req);
      return this.userRepository.save(newUser);
    }
  }

  async createManyUser(req: UserBodyDto[]) {
    const newUsers: User[] = [];

    // create query runner
    const QueryRunner = this.dataSource.createQueryRunner();

    //connect queryrunner to the database
    await QueryRunner.connect();

    // start transaction
    await QueryRunner.startTransaction();

    try {
      for (const user of req) {
        const createUser = QueryRunner.manager.create(User, user);
        const result = await QueryRunner.manager.save(createUser);
        newUsers.push(result);
        await QueryRunner.commitTransaction();
      }
    } catch (error) {
      // rollback transaction
      await QueryRunner.rollbackTransaction();
      throw new BadRequestException('Error while creating user', error);
    } finally {
      // release query runner
      await QueryRunner.release();
    }
  }

  async deleteUser(id: number) {
    return await this.userRepository.delete(id);
  }
}

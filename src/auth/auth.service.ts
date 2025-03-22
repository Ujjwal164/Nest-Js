import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UserService)) // forwardRef() is used to avoid circular dependency
    private readonly userService: UserService,
  ) {}

  getAll(param: number) {
    const checkUser = this.userService.getAll(param);
    return checkUser;
  }
}

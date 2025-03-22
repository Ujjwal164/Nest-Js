import { Controller, Get, Param } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authservice: AuthService) {}

  @Get('/:userId')
  checkUser(@Param('userId') param: string) {
    return this.authservice.getAll(+param);
  }
}

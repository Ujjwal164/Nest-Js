import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { UserBodyDto } from './dto/body.dto';
import { UserParamDto } from './dto/user-param.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('user')
@ApiTags('User')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':id')
  @ApiOperation({
    summary: 'Get user registered on the application using their id',
  })
  getUser(@Param() param: UserParamDto) {
    console.log(typeof param.id);
    const result = this.userService.getAll(+param.id);
    return result;
  }

  @Post('postUser')
  postuser(@Body() req: UserBodyDto) {
    return this.userService.createUser(req);
  }

  @Delete(':id')
  deleteUser(@Param('id') id: string) {
    return this.userService.deleteUser(+id);
  }
}

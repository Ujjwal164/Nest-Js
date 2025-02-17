import { Body, Controller, Get, Param, Post} from "@nestjs/common";
import { UserService } from "./user.service";
import { UserBodyDto} from "./dto/body.dto";
import { UserParamDto } from "./dto/user-param.dto";

@Controller('user')
export class UserController{
    constructor(
        private readonly userService:UserService
    ){}

    @Get(':id')
    getUser(@Param()  param:UserParamDto){
        console.log(typeof param.id)
     const result =  this.userService.getAll(+param.id)
     return result
    }
    
    @Post('postUser')
    postuser(@Body() req:UserBodyDto){
     return this.userService.createUser(req)
    }
  
}
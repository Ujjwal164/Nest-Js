import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';

@Injectable()
export class PostsService {
    constructor(
        private readonly userService:UserService
    ){}

    getAll(param){
        const user = this.userService.getAll(param)
        return user
    }
}

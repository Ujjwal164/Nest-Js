import { Module } from '@nestjs/common';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import { UserModule } from 'src/user/user.module';

@Module({
  controllers: [PostsController],
  providers: [PostsService],
  imports: [UserModule],
})
export class PostsModule {}

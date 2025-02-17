import { Module } from '@nestjs/common';

import { UserModule } from 'src/user/user.module';
import { PostsModule } from './posts/posts.module';


@Module({
  imports: [UserModule , PostsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}

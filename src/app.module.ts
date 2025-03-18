import { Module } from '@nestjs/common';
import { UserModule } from 'src/user/user.module';
import { PostsModule } from './posts/posts.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/user.entity';
import { TagsModule } from './tags/tags.module';
import { MetaOptionModule } from './meta-option/meta-option.module';
import { Post } from './posts/post.entity';
import { MetaOption } from './meta-option/metaOption.entity';
import { Tag } from './tags/tag.entity';

@Module({
  imports: [
    UserModule,
    PostsModule,
    AuthModule,
    TypeOrmModule.forRootAsync({
      imports: [],
      inject: [],
      useFactory: () => ({
        type: 'postgres',
        // entities: [User , Post , MetaOption , Tag],
        autoLoadEntities:true, // this is used to autoload the entities now we dont need to come here and add entity to the entuties
        synchronize: true, //  this will create the tables in the database and can be used only in development mode if use in production it will delete the data
        host: 'localhost',
        port: 5432,
        username: 'postgres',
        password: 'Ujjwal9012',
        database: 'NestProject',
      }),
    }),
    TagsModule,
    MetaOptionModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

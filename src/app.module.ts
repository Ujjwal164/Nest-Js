import { Module } from '@nestjs/common';
import { UserModule } from 'src/user/user.module';
import { PostsModule } from './posts/posts.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/user.entity';

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
        entities: [User],
        synchronize: true, //  this will create the tables in the database and can be used only in development mode if use in production it will delete the data
        host: 'localhost',
        port: 5432,
        username: 'postgres',
        password: 'Ujjwal9012',
        database: 'NestProject',
      }),
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

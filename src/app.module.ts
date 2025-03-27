import { Module } from '@nestjs/common';
import { UserModule } from 'src/user/user.module';
import { PostsModule } from './posts/posts.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TagsModule } from './tags/tags.module';
import { MetaOptionModule } from './meta-option/meta-option.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import appConfig from './config/app.config';
import databaseConfig from './config/database.config';
import environmentValidation from './config/environment.validation';

const ENV = process.env.NODE_ENV;

@Module({
  imports: [
    UserModule,
    PostsModule,
    AuthModule,
    ConfigModule.forRoot({
      isGlobal: true, // this will make the config module global and we dont need to import it in every module
      validationSchema: environmentValidation, // suppose we listes on key in the validation schema and we have not defined in the .env file then it will throw an error
      load: [appConfig, databaseConfig],
      envFilePath: !ENV ? '.env' : `.env.${ENV}`,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        // entities: [User , Post , MetaOption , Tag],
        autoLoadEntities: configService.get('database.autoLoadEntities'), // this is used to autoload the entities now we dont need to come here and add entity to the entuties
        synchronize: configService.get('database.sync'), //  this will create the tables in the database and can be used only in development mode if use in production it will delete the data
        host: configService.get('database.host'),
        port: configService.get('database.port'),
        username: configService.get('database.username'),
        password: configService.get('database.password'),
        database: configService.get('database.name'),
      }),
    }),
    TagsModule,
    MetaOptionModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

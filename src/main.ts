import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  /* use validation pipe globally and we use validation pipe only with dtos */
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // this will remove any other property that is not in the dto
      forbidNonWhitelisted: true, // this will throw an error if any other property that is not in the dto
      transform: true, // this make our dto instance of the term dto we used in our controller
    }),
  );

  /* Swagger setup */
  const config = new DocumentBuilder()
    .setTitle('NestJS API')
    .setDescription('The NestJS API description')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT ?? 4000);
}
bootstrap();

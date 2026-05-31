import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import env from './lib/env';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('School API')
    .setDescription('The school API description')
    .setVersion('1.0')
    .addTag('school')
    .build();

  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/', app, documentFactory);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );
  app.setGlobalPrefix('api');
  await app.listen(env.PORT ?? 3000);
}
void bootstrap();

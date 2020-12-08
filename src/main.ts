import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bodyParser: true,
  });
  const options = new DocumentBuilder()
    .setTitle('Rest API Example...')
    .setDescription('My first time with NestJS')
    .setVersion('1.0')
    .addTag('first_time')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);
  await app.init();
  const configService = app.get(ConfigService);
  await app.listen(configService.get('port'));
}

bootstrap();

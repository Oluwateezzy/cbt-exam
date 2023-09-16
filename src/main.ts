import { NestFactory } from '@nestjs/core';
import {SwaggerModule, DocumentBuilder} from '@nestjs/swagger';
import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle("Computer Based Test")
    .setDescription("A computer based test api")
    .setVersion("1.0")
    .addBearerAuth()
    .build();
    const document = SwaggerModule.createDocument(app, config)
    SwaggerModule.setup("api", app, document)
  await app.listen(3000);
}
bootstrap();

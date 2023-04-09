import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from './pipes/validation.pipe';

async function bootstrap() {
  
  const PORT = process.env.PORT || 7000;
  const app = await NestFactory.create(AppModule);

  const options = new DocumentBuilder()
    .setTitle('мессенджер API')
    .setDescription('API description')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('/api/docs', app, document);
  
  //app.useGlobalPipes(new ValidationPipe());
  app.enableCors();

  await app.listen(PORT, ()=> console.log(`Server started on port = ${PORT}`) )
}

bootstrap();

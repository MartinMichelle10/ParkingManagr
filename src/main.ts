import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Parking Manager API')
    .setDescription('Manages the cars of employees, and manage parking gates')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('swagger', app, document, {
    swaggerOptions: { defaultModelsExpandDepth: -1 },
  });

  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();

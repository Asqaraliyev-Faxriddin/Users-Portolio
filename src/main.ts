import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);


  let document = new DocumentBuilder()
  .setTitle('Profile API')
  .setVersion('1.0')
  .addBearerAuth()
  .build()

  let documentFactory = () =>  SwaggerModule.createDocument(app,document)

  SwaggerModule.setup('swagger', app, documentFactory());

  console.log(`🚀 Application is running on: http://localhost:${process.env.PORT ?? 3000}/swagger`);
  await app.listen(process.env.PORT ?? 3000);


}
bootstrap();

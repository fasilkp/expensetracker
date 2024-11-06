import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());
  app.enableCors({
    origin: 'http://localhost:3000', // Allow all origins
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Allowed methods
    credentials: true, // Allow credentials (cookies, authorization headers)
    allowedHeaders: 'Content-Type, Authorization', // Allowed headers
});
  await app.listen(process.env.PORT || 8080);
}
bootstrap();

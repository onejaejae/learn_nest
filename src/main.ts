import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as config from 'config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
  const serverConfig = config.get('server');
  const port = serverConfig.port;
  Logger.log(`application running ${port}`);
}
bootstrap();

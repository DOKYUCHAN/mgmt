import { NestFactory } from '@nestjs/core';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { SERVER_NAME } from '@app/constants';
import { LoggerService } from '@app/common/logger';
import { ConfigService } from '@app/common/config';

import { AppModule } from './app.module';

async function bootstrap() {
  process.env.SERVER_NAME = SERVER_NAME.MGMT;
  const app = await NestFactory.create(AppModule, { bufferLogs: true });

  // Set Swagger
  const swaggerConfig = new DocumentBuilder()
    .setTitle('management system')
    .setDescription('API document')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api-docs', app, document);

  const loggerService = await app.resolve(LoggerService);
  loggerService.setContext('Main');

  const configService = app.get(ConfigService);

  const config = configService.getAll();
  const appConfig = configService.getAppConfig();

  loggerService.info(bootstrap.name, config, 'print environment');
  app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER));

  await app.listen(appConfig.PORT, () => {
    loggerService.info(
      bootstrap.name,
      `🚀 [${appConfig.SERVER_NAME}][${appConfig.ENV}] Server open to ${
        appConfig.PORT
      } Started at: ${Date.now()}`,
    );
  });
}
bootstrap();

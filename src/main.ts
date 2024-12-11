import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ErrorHandlerFilter } from './common/error-handler/error-handler.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get<ConfigService>(ConfigService);
  const PORT = configService.get<number>('PORT') || 5173;

  app.useGlobalFilters(new ErrorHandlerFilter());
  // app.use(graphqlUploadExpress({ maxFileSize: 25000000, maxFiles: 3 }));

  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
  });

  await app.listen(PORT, async () => {
    Logger.log(`Server is running on: ${await app.getUrl()}`);
    Logger.log(`GraphQL Playground: ${await app.getUrl()}/graphql`);
  });
}
bootstrap();

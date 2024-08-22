import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ErrorHandlerFilter } from './common/error-handler/error-handler.filter';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get<ConfigService>(ConfigService);

  app.useGlobalFilters(new ErrorHandlerFilter());
  app.enableCors({ origin: '*', credentials: true });

  await app.listen(config.get('PORT') || 5173, async () => {
    Logger.log(`Server is running on: ${await app.getUrl()}`);
    // Link of the graphql playground
    Logger.log(`GraphQL Playground: ${await app.getUrl()}/graphql`);
  });
}
bootstrap();

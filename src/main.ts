import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ErrorHandlerFilter } from './common/error-handler/error-handler.filter';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get<ConfigService>(ConfigService);
  const PORT = configService.get<number>('PORT') || 5173;

  app.useGlobalFilters(new ErrorHandlerFilter());
  app.enableCors({ origin: '*', credentials: true });

  await app.listen(PORT, async () => {
    Logger.log(`Server is running on: ${await app.getUrl()}`);
    Logger.log(`GraphQL Playground: ${await app.getUrl()}/graphql`);
  });
}
bootstrap();

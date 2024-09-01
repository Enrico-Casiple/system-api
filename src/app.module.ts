import { ExecutionContext, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './common/prisma/prisma.module';
import { GqlExecutionContext, GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { LogModule } from './common/log/log.module';
import { PrismaService } from './common/prisma/prisma.service';
import { LoggersService } from './common/log/log.service';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { UserModule } from './tables/user/user.module';
import { GraphQLFormattedError } from 'graphql';
import { CompanyModule } from './tables/company/company.module';
import { DepartmentModule } from './tables/department/department.module';
import { RoleModule } from './tables/role/role.module';
import { SessionModule } from './tables/session/session.module';
import { UserAccountModule } from './tables/user-account/user-account.module';
import { NotesModule } from './tables/notes/notes.module';
import { UtilityModule } from './common/utility/utility.module';
import { SendEmailModule } from './common/send-email/send-email.module';
import { ErrorHandlerFilter } from './common/error-handler/error-handler.filter';
import { AccessTokenGuard } from './common/auth/guard/access-token/access-token.guard';
import { Reflector } from '@nestjs/core';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Ensures ConfigService is available globally
    }),
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      useFactory: async () => ({
        formatError: (error: GraphQLFormattedError) => {
          const { message, extensions } = error;
          return {
            message: message || 'An error occurred',
            extensions: {
              code: extensions?.code || 'INTERNAL_SERVER_ERROR',
              exception: extensions?.exception
                ? extensions.exception[0]
                : 'No stacktrace available',
            },
          };
        },
        autoSchemaFile: 'schema.gql',
        installSubscriptionHandlers: true,
        subscriptions: {
          'graphql-ws': true,
          onConnect: async (
            connectionParams: any,
            webSocket: any,
            context: any,
          ) => {
            const ctxt = GqlExecutionContext.create(context);
            const reflector = new Reflector();
            const guard = new AccessTokenGuard(reflector);
            const canActivate = await guard.canActivate(
              ctxt as ExecutionContext,
            );
            if (!canActivate) {
              throw new Error('Unauthorized');
            }
          },
        },
        playground: false, // Disable GraphQL playground
        plugins: [
          ApolloServerPluginLandingPageLocalDefault({
            footer: false, // Customization for landing page
          }),
        ],
      }),
    }),
    PrismaModule,
    LogModule,
    UserModule,
    CompanyModule,
    DepartmentModule,
    RoleModule,
    SessionModule,
    UserAccountModule,
    NotesModule,
    UtilityModule,
    SendEmailModule,
  ],
  providers: [
    PrismaService,
    LoggersService,
    {
      provide: 'APP_FILTER',
      useClass: ErrorHandlerFilter,
    },
    {
      provide: 'APP_GUARD',
      useClass: AccessTokenGuard,
    },
  ],
})
export class AppModule {}

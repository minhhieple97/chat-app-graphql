import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { ChatroomModule } from './chatroom/chatroom.module';
import { UserModule } from './user/user.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ApolloDriver } from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { AwsModule } from './aws/aws.module';
import { TokenService } from './token/token.service';
import { TokenModule } from './token/token.module';
import { RedisPubSub } from 'graphql-redis-subscriptions';
import { PUB_SUB } from './pubsub/pubsub.module';
const pubSub = new RedisPubSub({
  connection: {
    host: process.env.REDIS_HOST || 'localhost',
    port: parseInt(process.env.REDIS_PORT || '6379', 10),
    username: process.env.REDIS_USERNAME,
    password: process.env.REDIS_PASSWORD,
    retryStrategy: (times) => {
      // retry strategy
      return Math.min(times * 50, 2000);
    },
  },
});
@Module({
  imports: [
    AwsModule,
    PrismaModule,
    AuthModule,
    ChatroomModule,
    UserModule,
    GraphQLModule.forRootAsync({
      imports: [ConfigModule, TokenModule],
      inject: [ConfigService, TokenService],
      driver: ApolloDriver,
      useFactory: async (tokenService: TokenService) => {
        return {
          playground: true,
          autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
          sortSchema: true,
          subscriptions: {
            'graphql-ws': true,
            'subscriptions-transport-ws': true,
          },
          onConnect: (connectionParams) => {
            const token = tokenService.extractToken(connectionParams);

            if (!token) {
              throw new Error('Token not provided');
            }
            const user = tokenService.validateRefreshToken(token);
            if (!user) {
              throw new Error('Invalid token');
            }
            return { user };
          },
          context: ({ req, res, connection }) => {
            if (connection) {
              return { req, res, user: connection.context.user, pubSub }; // Injecting pubSub into context
            }
            return { req, res };
          },
        };
      },
    }),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TokenModule,
  ],
  controllers: [AppController],
  providers: [AppService, TokenService, { provide: PUB_SUB, useValue: pubSub }],
  exports: [TokenService],
})
export class AppModule {}

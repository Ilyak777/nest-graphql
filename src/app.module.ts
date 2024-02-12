import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { UserResolver } from './graphql/resolvers/user.resolver';
import { UserSettingResolver } from './graphql/resolvers/user-settings.resolver';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'src/schema.gql',
    }),
  ],
  providers: [UserResolver, UserSettingResolver],
})
export class AppModule {}

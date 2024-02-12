import {
  Resolver,
  Query,
  Args,
  Int,
  ResolveField,
  Parent,
  Mutation,
} from '@nestjs/graphql';
import { User } from '../models/user';
import { mockUsers } from 'src/_mocks_/mockUsers';
import { UserSettings } from '../models/user-settings';
import { mockUserSettings } from 'src/_mocks_/mockUserSettings';
import { CreateUserInput } from '../dto/create-user.input';

@Resolver(() => User)
export class UserResolver {
  @Query(() => User, { nullable: true })
  queryUserById(@Args('id', { type: () => Int }) id: number) {
    return mockUsers.find((user) => user.id === id);
  }

  @Query(() => [User])
  queryUsers() {
    return mockUsers;
  }

  @ResolveField(() => UserSettings, {
    name: 'settings',
    nullable: true,
  })
  getUserSettings(@Parent() user: User) {
    console.log(user);
    return mockUserSettings.find((setting) => setting.userId === user.id);
  }

  @Mutation(() => User)
  createUser(@Args('createUserData') createUserData: CreateUserInput) {
    const { username, displayName } = createUserData;
    const newUser = {
      username,
      displayName,
      id: 5,
    };
    mockUsers.push(newUser);
    return newUser;
  }
}

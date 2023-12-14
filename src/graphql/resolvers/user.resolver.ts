import {
  Resolver,
  Query,
  Args,
  Int,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { User } from '../models/User';
import { mockUsers } from 'src/_mocks_/mockUsers';
import { UserSetting } from '../models/UserSetting';
import { mockUserSettings } from 'src/_mocks_/mockUserSettings';

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

  @ResolveField(() => UserSetting, {
    name: 'settings',
    nullable: true,
  })
  getUserSettings(@Parent() user: User) {
    console.log(user);
    return mockUserSettings.find((setting) => setting.userId === user.id);
  }
}

import { Module } from '@nestjs/common';
import { UserCrudResolver } from '@generated/type-graphql';
import { CustomUserResolver } from './custom-user.resolver';

@Module({
  providers: [UserCrudResolver, CustomUserResolver],
})
export class UserModule {}

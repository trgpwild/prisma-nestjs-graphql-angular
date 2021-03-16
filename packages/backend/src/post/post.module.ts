import { Module } from '@nestjs/common';
import { PostCrudResolver } from '@generated/type-graphql';

@Module({
  providers: [PostCrudResolver],
})
export class PostModule {}

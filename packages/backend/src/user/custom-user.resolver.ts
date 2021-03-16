import { PrismaClient } from '@prisma/client';
import { Resolver, Query, FieldResolver, Ctx, Root } from 'type-graphql';

import { User, Post } from '@generated/type-graphql';

interface Context {
  prisma: PrismaClient;
}
@Resolver((of) => User)
export class CustomUserResolver {
  @Query(() => User, { nullable: true })
  async bestUser(@Ctx() { prisma }: Context): Promise<User | null> {
    return await prisma.user.findFirst({
      where: { email: 'bob@prisma.io' },
    });
  }

  @FieldResolver(() => Post, { nullable: true })
  async favoritePost(
    @Root() user: User,
    @Ctx() { prisma }: Context,
  ): Promise<Post | undefined> {
    const [favoritePost] = await prisma.user
      .findFirst({ where: { id: user.id } })
      .posts({ take: 1 });

    return favoritePost;
  }
}

import { Module } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PostModule } from 'src/post/post.module';
import { UserModule } from 'src/user/user.module';
import { TypeGraphQLModule } from 'typegraphql-nestjs';

const prisma = new PrismaClient();

@Module({
  imports: [
    TypeGraphQLModule.forRoot({
      emitSchemaFile: true,
      playground: true,
      introspection: true,
      validate: false,
      dateScalarMode: 'timestamp',
      context: ({ req }) => ({ currentUser: req.user, prisma }),
    }),
    UserModule,
    PostModule,
  ],
})
export class AppModule {}

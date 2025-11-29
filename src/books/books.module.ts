import { Module } from '@nestjs/common';
import { BooksService } from './books.service';
import { BooksController } from './books.controller';
import { BooksResolver } from './resolvers/books.resolver';

@Module({
  providers: [BooksService, BooksResolver],
  controllers: [BooksController]
})
export class BooksModule {}

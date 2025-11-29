import { Module } from '@nestjs/common';
import { BooksService } from './books.service';
import { BooksController } from './books.controller';
import { BooksResolver } from './resolvers/books.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { Book, BookSchema } from './model/books.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Book.name,
        schema: BookSchema,
      },
    ]),
  ],
  providers: [BooksService, BooksResolver],
  controllers: [BooksController],
})
export class BooksModule {}

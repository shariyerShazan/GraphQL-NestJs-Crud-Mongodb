import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { BooksService } from '../books.service';
import { Book } from '../model/books.model';
import { CreateBookDto } from '../dto/create-books-dto';
import { UpdateBookDto } from '../dto/update-books-dto';

@Resolver(() => Book)
export class BooksResolver {
  constructor(private readonly booksService: BooksService) {}

  @Query(() => [Book], { name: 'getAllBooks' })
  async findAll(
    @Args('page', { nullable: true }) page?: number,
    @Args('limit', { nullable: true }) limit?: number,
    @Args('search', { nullable: true }) search?: string,
    @Args('author', { nullable: true }) author?: string,
    @Args('sort', { nullable: true }) sort?: 'asc' | 'desc',
  ) {
    return this.booksService.findAll({
      page,
      limit,
      search,
      author,
      sort,
    });
  }

  @Query(() => Book, { name: 'getBook' })
  async findOne(@Args('id') id: string) {
    return this.booksService.findOne(id);
  }

  @Mutation(() => Book)
  async createBook(@Args('input') input: CreateBookDto) {
    return this.booksService.create(input);
  }

  @Mutation(() => Book)
  async updateBook(
    @Args('id') id: string,
    @Args('input') input: UpdateBookDto,
  ) {
    return this.booksService.update(id, input);
  }

  @Mutation(() => Book)
  async deleteBook(@Args('id') id: string) {
    return this.booksService.delete(id);
  }

  @Mutation(() => Book)
  async softDeleteBook(@Args('id') id: string) {
    return this.booksService.softDelete(id);
  }

  @Mutation(() => Book)
  async restoreBook(@Args('id') id: string) {
    return this.booksService.restore(id);
  }
}

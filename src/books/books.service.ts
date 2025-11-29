import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Book } from './model/books.model';
import { Model } from 'mongoose';
import { CreateBookDto } from './dto/create-books-dto';
import { UpdateBookDto } from './dto/update-books-dto';

@Injectable()
export class BooksService {
  constructor(@InjectModel(Book.name) private bookModel: Model<Book>) {}

  async create(input: CreateBookDto): Promise<Book> {
    const newBook = new this.bookModel(input);
    return newBook.save();
  }

  async findAll(options?: {
    page?: number;
    limit?: number;
    search?: string;
    author?: string;
    sort?: 'asc' | 'desc';
  }): Promise<Book[]> {
    const {
      page = 1,
      limit = 10,
      search,
      author,
      sort = 'desc',
    } = options || {};

    const skip = (page - 1) * limit;

    const query: Record<string, any> = {};
    if (search) query.title = { $regex: search, $options: 'i' };
    if (author) query.author = author;

    return this.bookModel
      .find(query)
      .sort({ createdAt: sort === 'asc' ? 1 : -1 })
      .skip(skip)
      .limit(limit)
      .exec();
  }

  async findOne(id: string): Promise<Book> {
    const book = await this.bookModel.findById(id).exec();
    if (!book) throw new NotFoundException('Book not found');
    return book;
  }

  async count(): Promise<number> {
    return this.bookModel.countDocuments();
  }

  async update(id: string, input: UpdateBookDto): Promise<Book> {
    const updatedBook = await this.bookModel.findByIdAndUpdate(id, input, {
      new: true,
      runValidators: true,
    });

    if (!updatedBook) throw new NotFoundException('Book not found');
    return updatedBook;
  }

  async softDelete(id: string): Promise<Book> {
    const updated = await this.bookModel.findByIdAndUpdate(
      id,
      { deletedAt: new Date() },
      { new: true },
    );
    if (!updated) throw new NotFoundException('Book not found');
    return updated;
  }

  async restore(id: string): Promise<Book> {
    const updated = await this.bookModel.findByIdAndUpdate(
      id,
      { deletedAt: null },
      { new: true },
    );
    if (!updated) throw new NotFoundException('Book not found');
    return updated;
  }

  async delete(id: string): Promise<Book> {
    const deleted = await this.bookModel.findByIdAndDelete(id).exec();
    if (!deleted) throw new NotFoundException('Book not found');
    return deleted;
  }
}

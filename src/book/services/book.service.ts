import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BookDto } from './../dto/book.dto';
import { Book } from '../entities/book.entity';

@Injectable()
export class BookService 
{
    constructor(
        @InjectRepository(Book)
        private readonly bookRepository: Repository<Book>
    ) 
    {}

    async all(): Promise<Book[]>
    {
        return await this.bookRepository.find();
    }

    async create(library: BookDto): Promise<BookDto>
    {
        return await this.bookRepository.save(library);
    }

    async update(id: number, library: BookDto): Promise<Book>
    {
        await this.bookRepository.update(id, library);
        return await this.bookRepository.findOne(id);
    }

    async delete(id: number): Promise<Book>
    {
        const library = await this.bookRepository.findOne(id);
        await this.bookRepository.delete(id);

        return library;
    }
}

import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
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
    ) {}

    async all(constraint?: object): Promise<Book[]>
    {
        return await this.bookRepository.find(constraint);
    }

    async find(id: number): Promise<Book>
    {
        const response = await this.bookRepository.findOne(id);

        if(response) return response;
        throw new HttpException('Not found book with code: ' + id, HttpStatus.NOT_FOUND);
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

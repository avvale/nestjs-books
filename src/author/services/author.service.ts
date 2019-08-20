import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuthorDto } from '../dto/author.dto';
import { Author } from '../entities/author.entity';

@Injectable()
export class AuthorService 
{
    constructor(
        @InjectRepository(Author)
        private readonly authorRepository: Repository<Author>
    ) 
    {}

    async all(constraint?: object): Promise<Author[]>
    {
        return await this.authorRepository.find(constraint);
    }

    async find(id: number): Promise<Author>
    {
        const response = await this.authorRepository.findOne(id);

        if(response) return response;
        throw new HttpException('Not found author with code: ' + id, HttpStatus.NOT_FOUND);
    }

    async create(author: AuthorDto): Promise<Author>
    {
        return await this.authorRepository.save(author);
    }

    async update(id: number, author: AuthorDto): Promise<Author>
    {
        await this.authorRepository.update(id, author);   
        return await this.authorRepository.findOne(id);
    }

    async delete(id: number): Promise<Author>
    {
        const author = await this.authorRepository.findOne(id);
        await this.authorRepository.delete(id);

        return author;
    }
}

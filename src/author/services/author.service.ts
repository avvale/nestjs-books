import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuthorDto } from './../dto/author.dto';
import { Author } from '../entities/author.entity';

@Injectable()
export class AuthorService 
{
    constructor(
        @InjectRepository(Author)
        private readonly authorRepository: Repository<AuthorDto>
    ) 
    {}

    async all(): Promise<AuthorDto[]>
    {
        return await this.authorRepository.find();
    }

    async create(author: AuthorDto): Promise<AuthorDto>
    {
        return await this.authorRepository.save(author);
    }

    async update(id: number, author: AuthorDto): Promise<AuthorDto>
    {
        await this.authorRepository.update(id, author);
        return await this.authorRepository.findOne(id);
    }

    async delete(id: number): Promise<AuthorDto>
    {
        const author = this.authorRepository.findOne(id);
        this.authorRepository.delete(id);

        return author;
    }
}

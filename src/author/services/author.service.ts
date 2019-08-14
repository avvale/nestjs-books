import { Injectable } from '@nestjs/common';
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

    async all(): Promise<Author[]>
    {
        return await this.authorRepository.find();
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
        const author = this.authorRepository.findOne(id);
        this.authorRepository.delete(id);

        return author;
    }
}

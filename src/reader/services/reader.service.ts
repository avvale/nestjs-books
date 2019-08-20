import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ReaderDto } from './../dto/reader.dto';
import { Reader } from '../entities/reader.entity';
import * as _ from 'lodash';

@Injectable()
export class ReaderService 
{
    constructor(
        @InjectRepository(Reader)
        private readonly readerRepository: Repository<Reader>
    ) 
    {}

    async all(): Promise<Reader[]>
    {
        return await this.readerRepository.find();
    }

    async find(id: number): Promise<Reader>
    {
        const response = await this.readerRepository.findOne(id);

        if(response) return response;
        throw new HttpException('Not found author with code: ' + id, HttpStatus.NOT_FOUND);
    }

    async create(reader: ReaderDto): Promise<Reader>
    {
        return await this.readerRepository.save(reader);
    }

    async update(id: number, reader: ReaderDto): Promise<Reader>
    {
        await this.readerRepository.update(id, _.pick(reader, ReaderDto.manageable));

        if (reader.books)
        {
            const readerModel = await this.readerRepository.findOne(id);

            await this.readerRepository
                .createQueryBuilder()
                .relation(Reader, "books")
                .of(readerModel)
                .addAndRemove(reader.books, readerModel.books);
        }

        return await this.readerRepository.findOne(id);
    }

    async delete(id: number): Promise<Reader>
    {
        const reader = await this.readerRepository.findOne(id);

        if(!reader) throw new HttpException('Not found reader with code: ' + id, HttpStatus.NOT_FOUND);
        
        await this.readerRepository.delete(id);

        return reader;
    }
}

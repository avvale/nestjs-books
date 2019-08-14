import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ReaderDto } from './../dto/reader.dto';
import { Reader } from '../entities/reader.entity';

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

    async create(reader: ReaderDto): Promise<Reader>
    {
        const res = await this.readerRepository.save(reader);

        if (reader.books)
        {
            this.readerRepository
                .createQueryBuilder()
                .relation(Reader, "books")
                .of(res)
                .add(reader.books);
        }
    
        return res;
    }

    async update(id: number, reader: ReaderDto): Promise<Reader>
    {
        await this.readerRepository.update(id, reader);

        const readerModel = await this.readerRepository.findOne(id);
        this.readerRepository
                .createQueryBuilder()
                .relation(Reader, "books")
                .of(id)
                .remove(readerModel.books);

            
        // reader = this.readerRepository.merge(readerModel, reader);

        await this.readerRepository.update(id, reader);


        console.log(readerModel);

        if (reader.books)
        {
            this.readerRepository
                .createQueryBuilder()
                .relation(Reader, "books")
                .of(id)
                .add(reader.books);
        }

        return await this.readerRepository.findOne(id);
    }

    async delete(id: number): Promise<Reader>
    {
        const reader = this.readerRepository.findOne(id);
        this.readerRepository.delete(id);

        return reader;
    }
}

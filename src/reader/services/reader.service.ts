import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
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
        return await this.readerRepository.save(reader);
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
        const reader = await this.readerRepository.findOne(id);

        if(!reader) throw new HttpException('Not found reader with code: ' + id, HttpStatus.NOT_FOUND);
        
        await this.readerRepository.delete(id);

        return reader;
    }
}

import { Controller, Get, Post, Body, Put, Param, Delete, HttpStatus, HttpCode } from '@nestjs/common';
import { ReaderDto } from '../dto/reader.dto';
import { ReaderService } from '../services/reader.service';
import { ApiUseTags } from '@nestjs/swagger';

@ApiUseTags('Reader')
@Controller('reader')
export class ReaderController 
{
    constructor(
        private readerService: ReaderService
    )
    {}

    @Get()
    all() 
    {
        return this.readerService.all();
    }

    @Get(':id')
    find(@Param('id') id: number) 
    {
        return this.readerService.find(id);
    }
    
    @Post()
    @HttpCode(HttpStatus.CREATED)
    create(@Body() reader: ReaderDto)
    {
        return this.readerService.create(reader);
    }

    @Put(':id')
    update(@Param('id') id: number, @Body() reader: ReaderDto) 
    {
        return this.readerService.update(id, reader);
    }

    @Delete(':id')
    delete(@Param('id') id: number)
    {
        return this.readerService.delete(id);
    }
}

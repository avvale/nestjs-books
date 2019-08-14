import { Controller, Get, Post, Body, Put, Param, Delete, HttpStatus, HttpCode, HttpException } from '@nestjs/common';
import { AuthorDto } from '../dto/author.dto';
import { AuthorService } from '../services/author.service';

@Controller('author')
export class AuthorController 
{
    constructor(
        private authorService: AuthorService
    )
    {}

    @Get()
    all() 
    {
        return this.authorService.all();
    }

    @Get(':id')
    find(@Param('id') id: number) 
    {
        return this.authorService.find(id);
    }
    
    @Post()
    @HttpCode(HttpStatus.CREATED)
    create(@Body() author: AuthorDto)
    {
        return this.authorService.create(author)
    }

    @Put(':id')
    update(@Param('id') id: number, @Body() author: AuthorDto) 
    {
        return this.authorService.update(id, author);
    }

    @Delete(':id')
    delete(@Param('id') id: number)
    {
        return this.authorService.delete(id);
    }
}

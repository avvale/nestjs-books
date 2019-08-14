import { Controller, Get, Res, Post, Body, Put, Param, Delete, HttpStatus } from '@nestjs/common';
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
    
    @Post()
    create(@Body() author: AuthorDto)
    {
        this.authorService.create(author)
    }

    @Put(':id')
    update(@Param('id') id: number, @Body() author: AuthorDto) 
    {
        this.authorService.update(id, author);
    }

    @Delete(':id')
    delete(@Param('id') id: number)
    {
        this.authorService.delete(id);
    }
}

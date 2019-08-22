import { Controller, Get, Post, Body, Put, Param, Delete, HttpStatus, HttpCode, HttpException, Logger } from '@nestjs/common';
import { ApiUseTags, ApiResponse } from '@nestjs/swagger';
import { AuthorDto } from '../dto/author.dto';
import { AuthorService } from '../services/author.service';

@ApiUseTags('Author')
@Controller('author')
export class AuthorController 
{
    private readonly logger = new Logger(AuthorController.name);
    
    constructor(
        private authorService: AuthorService
    )
    {}

    @Get()
    @ApiResponse({ status: HttpStatus.OK, description: 'The records has been successfully read.'})
    all() 
    {
        this.logger.log('Get all authors'); // example of logs
        return this.authorService.all();
    }

    @Get(':id')
    @ApiResponse({ status: HttpStatus.OK, description: 'The record has been successfully read.'})
    @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Record not found.'})
    find(@Param('id') id: number) 
    {
        this.logger.log('Get author'); // example of logs
        return this.authorService.find(id);
    }
    
    @Post()
    @ApiResponse({ status: HttpStatus.CREATED, description: 'The record has been successfully read.'})
    @HttpCode(HttpStatus.CREATED)
    create(@Body() author: AuthorDto)
    {
        this.logger.log('Create author'); // example of logs
        return this.authorService.create(author)
    }

    @Put(':id')
    update(@Param('id') id: number, @Body() author: AuthorDto) 
    {
        this.logger.log('Update author'); // example of logs
        return this.authorService.update(id, author);
    }

    @Delete(':id')
    delete(@Param('id') id: number)
    {
        this.logger.log('Delete author'); // example of logs
        return this.authorService.delete(id);
    }
}

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
    all(@Res() response) 
    {
        this.authorService
            .all()
            .then(authors => 
            {
                console.log(response.status().json('holaaa'));
                response.status(HttpStatus.CREATED).json(authors);        
            })
            .catch(error => 
            {
                response.status(HttpStatus.FORBIDDEN).json({message: 'error get author', error});
            });
    }
    
    @Post()
    create(@Body() author: AuthorDto, @Res() response)
    {
        this.authorService
            .create(author)
            .then(author => 
            {
                response.status(HttpStatus.CREATED).json(author);
            })
            .catch(error => 
            {
                response.status(HttpStatus.FORBIDDEN).json({message: 'error create author', error});
            });
    }

    @Put(':id')
    update(@Param('id') id: number, @Body() author: AuthorDto, @Res() response) 
    {
        this.authorService
            .update(id, author)
            .then(author => 
            {
                response.status(HttpStatus.OK).json(author);
            })
            .catch(error => 
            {
                response.status(HttpStatus.FORBIDDEN).json({message: 'error update author', error});
            });
    }

    @Delete(':id')
    delete(@Param('id') id: number, @Res() response)
    {
        this.authorService
            .delete(id)
            .then(author => 
            {
                response.status(HttpStatus.OK).json(author);
            })
            .catch(error => 
            {
                response.status(HttpStatus.FORBIDDEN).json({message: 'error delete author', error});
            });
    }
}

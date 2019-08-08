import { Controller, Get, Res, Post, Body, Put, Param, Delete, HttpStatus } from '@nestjs/common';
import { BookDto } from './dto/book.dto';
import { BookService } from './services/book.service';

@Controller('book')
export class BookController 
{
    constructor(
        private bookService: BookService
    )
    {}

    @Get()
    all(@Res() response) 
    {
        this.bookService
            .all()
            .then(libraries => 
            {
                response.status(HttpStatus.CREATED).json(libraries);
            })
            .catch(error => 
            {
                response.status(HttpStatus.FORBIDDEN).json({message: 'error get book', error});
            });
    }
    
    @Post()
    create(@Body() book: BookDto, @Res() response)
    {
        this.bookService
            .create(book)
            .then(book => 
            {
                response.status(HttpStatus.CREATED).json(book);
            })
            .catch(error => 
            {
                response.status(HttpStatus.FORBIDDEN).json({message: 'error create book', error});
            });
    }

    @Put(':id')
    update(@Param('id') id: number, @Body() book: BookDto, @Res() response) 
    {
        this.bookService
            .update(id, book)
            .then(book => 
            {
                response.status(HttpStatus.OK).json(book);
            })
            .catch(error => 
            {
                response.status(HttpStatus.FORBIDDEN).json({message: 'error update book', error});
            });
    }

    @Delete(':id')
    delete(@Param('id') id: number, @Res() response)
    {
        this.bookService
            .delete(id)
            .then(book => 
            {
                response.status(HttpStatus.OK).json(book);
            })
            .catch(error => 
            {
                response.status(HttpStatus.FORBIDDEN).json({message: 'error delete book', error});
            });
    }
}

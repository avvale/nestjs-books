import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Author } from './author/entities/author.entity';
import { AuthorController } from './author/controllers/author.controller';
import { AuthorService } from './author/services/author.service';
import { Book } from './book/entities/book.entity';
import { BookController } from './book/book.controller';
import { BookService } from './book/services/book.service';
/* import { ReaderController } from './reader/reader.controller';
import { ReaderService } from './reader/services/reader.service';
import { Reader } from './reader/entities/reader.entity'; */

@Module({
    imports: [
        TypeOrmModule.forRoot({
            "type": "mysql",
            "host": "localhost",
            "port": 33001,
            "username": "root",
            "password": "123456",
            "database": "book_local",
            "entities": [__dirname + '/**/*.entity{.ts,.js}'],
            "synchronize": true
        }),
        TypeOrmModule.forFeature([
            Author, 
            Book, 
           // Reader
        ])
    ],
    controllers: [
        AuthorController,
        BookController,
       // ReaderController
    ],
    providers: [
        AuthorService, 
        BookService, 
      //  ReaderService
    ],
})
export class AppModule { }

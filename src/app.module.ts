import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { Author } from './author/entities/author.entity';
import { AuthorController } from './author/controllers/author.controller';
import { AuthorService } from './author/services/author.service';
import { Book } from './book/entities/book.entity';
import { BookController } from './book/controllers/book.controller';
import { BookService } from './book/services/book.service';
import { ReaderController } from './reader/controllers/reader.controller';
import { ReaderService } from './reader/services/reader.service';
import { Reader } from './reader/entities/reader.entity';
import { AuthorResolver } from './author/graphql/author.resolver';

@Module({
    imports: [
        GraphQLModule.forRoot({
            debug: true,
            playground: true,
            typePaths: ['./**/*.graphql'],
            definitions: {
                path: join(process.cwd(), 'src/graphql.ts')
            },
        }),
        TypeOrmModule.forRoot(),
        TypeOrmModule.forFeature([
            Author, 
            Book, 
            Reader
        ])
    ],
    controllers: [
        AuthorController,
        BookController,
        ReaderController
    ],
    providers: [
        AuthorService, 
        BookService, 
        ReaderService,
        AuthorResolver
    ],
})
export class AppModule { }

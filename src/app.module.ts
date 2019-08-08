import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Author } from './author/entities/author.entity';
import { AuthorController } from './author/author.controller';
import { AuthorService } from './author/services/author.service';
import { Book } from './book/entities/book.entity';
import { BookController } from './book/book.controller';
import { BookService } from './book/services/book.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      "type": "mysql",
      "host": "localhost",
      "port": 33001,
      "username": "root",
      "password": "123456",
      "database": "book_local",
      "entities": ["src/**/*.entity{.ts,.js}"],
      "synchronize": true
    }),
    TypeOrmModule.forFeature([Author, Book])
  ],
  controllers: [AppController, AuthorController, BookController],
  providers: [AppService, AuthorService, BookService],
})
export class AppModule {}

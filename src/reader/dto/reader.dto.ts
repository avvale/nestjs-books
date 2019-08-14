import { BookDto } from './../../book/dto/book.dto';

export class ReaderDto
{
    id: number;
    name: string;
    books: BookDto[];
}

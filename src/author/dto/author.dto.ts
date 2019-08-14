import { BookDto } from './../../book/dto/book.dto';

export class AuthorDto
{
    id: number;
    name: string;
    books: BookDto[]
}

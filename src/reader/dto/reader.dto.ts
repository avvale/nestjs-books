import { BookDto } from './../../book/dto/book.dto';

export class ReaderDto
{
    static manageable: string[] = ['id', 'name'];  
    id: number;
    name: string;
    books: BookDto[];
}

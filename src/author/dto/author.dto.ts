import { BookDto } from './../../book/dto/book.dto';

export class AuthorDto
{
    static manageable: string[] = ['id', 'uuid', 'name'];
    
    id: number;
    uuid: string;
    name: string;
    books: BookDto[]
}

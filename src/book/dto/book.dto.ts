import { AuthorDto } from './../../author/dto/author.dto';
import { ReaderDto } from 'src/reader/dto/reader.dto';

export class BookDto 
{
    id: number;
    name: string;
    author: AuthorDto;
    readers: ReaderDto[];
}

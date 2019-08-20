import { AuthorDto } from './../../author/dto/author.dto';
import { ReaderDto } from 'src/reader/dto/reader.dto';

export class BookDto 
{
    static manageable: string[] = ['id', 'uuid', 'name'];
    
    id: number;
    uuid: string;
    name: string;
    author: AuthorDto;
    readers: ReaderDto[];
}

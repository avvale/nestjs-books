import { ApiModelProperty } from '@nestjs/swagger';
import { AuthorDto } from './../../author/dto/author.dto';
import { ReaderDto } from 'src/reader/dto/reader.dto';

export class BookDto 
{
    static manageable: string[] = ['id', 'uuid', 'name'];
    
    @ApiModelProperty()
    id: number;
    
    @ApiModelProperty()
    uuid: string;
    
    @ApiModelProperty()
    name: string;
    
    @ApiModelProperty({
        description: 'author related to this book',
        type: AuthorDto
    })
    author: AuthorDto;
    
    @ApiModelProperty()
    readers: ReaderDto[];
}

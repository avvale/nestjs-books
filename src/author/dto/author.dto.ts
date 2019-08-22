import { ApiModelProperty } from '@nestjs/swagger';
import { BookDto } from './../../book/dto/book.dto';

export class AuthorDto
{
    static manageable: string[] = ['id', 'uuid', 'name'];
    
    @ApiModelProperty({
        description: 'unique identification of author'
    })
    id: number;

    @ApiModelProperty()
    uuid: string;

    @ApiModelProperty()
    name: string;

    @ApiModelProperty({
        required: false,
        description: 'books related to this author',
        isArray: true,
        type: [BookDto]
    })
    books: BookDto[];
}

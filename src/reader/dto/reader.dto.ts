import { ApiModelProperty } from '@nestjs/swagger';
import { BookDto } from './../../book/dto/book.dto';

export class ReaderDto
{
    static manageable: string[] = ['id', 'uuid', 'name'];
    
    @ApiModelProperty()
    id: number;

    @ApiModelProperty()
    uuid: string;

    @ApiModelProperty()
    name: string;

    @ApiModelProperty()
    books: BookDto[];
}

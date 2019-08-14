import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, RelationId } from 'typeorm';
import { Book } from './../../book/entities/book.entity';

@Entity()
export class Reader 
{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    /* @RelationId((reader: Reader) => reader.books)
    bookIds: number[]; */

    @ManyToMany(type => Book, {
        eager: true
    })
    @JoinTable()
    books: Book[];
}

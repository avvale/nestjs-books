import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Book } from './../../book/entities/book.entity';

@Entity()
export class Author 
{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @OneToMany(type => Book, book => book.author)
    books: Book[];
}

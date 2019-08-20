import { Entity, PrimaryGeneratedColumn, Generated, Column, OneToMany } from 'typeorm';
import { Book } from './../../book/entities/book.entity';

@Entity()
export class Author 
{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @Generated('uuid')
    uuid: string;

    @Column()
    name: string;

    @OneToMany(type => Book, book => book.author)
    books: Book[];
}

import { Entity, PrimaryGeneratedColumn, Generated, Column, OneToMany, Index } from 'typeorm';
import { Book } from './../../book/entities/book.entity';

@Entity()
export class Author 
{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @Generated('uuid')
    @Index()
    uuid: string;

    @Column()
    name: string;

    @OneToMany(type => Book, book => book.author)
    books: Book[];
}

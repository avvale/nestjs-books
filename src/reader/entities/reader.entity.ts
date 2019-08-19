import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, RelationId } from 'typeorm';
import { Book } from './../../book/entities/book.entity';

@Entity()
export class Reader 
{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @ManyToMany(type => Book, {
        eager: true
    })
    @JoinTable()
    books: Book[];
}

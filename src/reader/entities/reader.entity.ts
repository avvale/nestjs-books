import { Entity, PrimaryGeneratedColumn, Generated, Column, ManyToMany, JoinTable, RelationId } from 'typeorm';
import { Book } from './../../book/entities/book.entity';

@Entity()
export class Reader 
{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @Generated('uuid')
    uuid: string;

    @Column()
    name: string;

    @ManyToMany(type => Book, {
        eager: true
    })
    @JoinTable()
    books: Book[];
}

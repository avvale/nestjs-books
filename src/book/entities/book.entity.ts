import { Author } from '../../author/entities/author.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

@Entity()
export class Book 
{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    authorId: number;

    @ManyToOne(type => Author, author => author.books, {
        eager: true,
        onDelete: 'RESTRICT',
        onUpdate: 'CASCADE'
    })
    author: Author;
}

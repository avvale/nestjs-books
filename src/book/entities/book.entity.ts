import { Entity, PrimaryGeneratedColumn, Generated, Column, ManyToOne, Index } from 'typeorm';
import { Author } from '../../author/entities/author.entity';

@Entity()
export class Book 
{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @Generated('uuid')
    @Index()
    uuid: string;

    @Column()
    name: string;

    @ManyToOne(type => Author, author => author.books, {
        eager: true,
        onDelete: 'RESTRICT',
        onUpdate: 'CASCADE'
    })
    author: Author;
}

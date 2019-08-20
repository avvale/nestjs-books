import { Entity, PrimaryGeneratedColumn, Generated, Column, ManyToOne } from 'typeorm';
import { Author } from '../../author/entities/author.entity';

@Entity()
export class Book 
{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @Generated('uuid')
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

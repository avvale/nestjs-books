import { Resolver, Query, ResolveProperty, Parent, Args } from "@nestjs/graphql";
import { AuthorService } from "../services/author.service";
import { BookService } from "../../book/services/book.service";
import { Author, Book } from "src/graphql";

@Resolver('Author')
export class AuthorResolver 
{
    constructor(
        private readonly authorService: AuthorService,
        private readonly bookService: BookService,
    ) {}

    @Query()
    async author(@Args('id') id: number): Promise<Author>
    {
        return await this.authorService.find(id);
    }

    @Query()
    async authors(): Promise<Author[]>
    {
        return await this.authorService.all();
    }

    @ResolveProperty()
    async books(@Parent() author): Promise<Book[]>
    {
        const { id } = author;
        return await this.bookService.all();
    }
}
import { Resolver, Query, ResolveProperty, Parent, Args } from "@nestjs/graphql";
import { BookService } from "../services/book.service";
import { Book } from "src/graphql";

@Resolver('Book')
export class BookResolver 
{
    constructor(
        private readonly bookService: BookService,
    ) {}

    @Query()
    async book(@Args('id') id: number): Promise<Book>
    {
        return await this.bookService.find(id);
    }

    @Query()
    async books(): Promise<Book[]>
    {
        return await this.bookService.all();
    }
}
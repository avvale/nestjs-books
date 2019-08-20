
/** ------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
export interface Author {
    id: number;
    uuid: string;
    name: string;
    books?: Book[];
}

export interface Book {
    id: number;
    uuid: string;
    name: string;
    author?: Author;
}

export interface IQuery {
    author(id: number): Author | Promise<Author>;
    authors(): Author[] | Promise<Author[]>;
}

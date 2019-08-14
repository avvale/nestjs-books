import { Book } from '../../book/entities/book.entity';
import { Test } from '@nestjs/testing';
import { AuthorController } from './author.controller';
import { AuthorService } from '../services/author.service';
import { Author } from '../entities/author.entity';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('AuthorController', () => 
{
    let authorController: AuthorController;
    let authorService: AuthorService;

    const mockResponse = {
        send: (body?: any) => {},
        status: (code: number) => mockResponse,
        json: (obj: any) => obj
    };

    const mockRepository = jest.fn(() => ({
        metadata: {
            columns: [],
            relations: [],
        },
    }));

    beforeEach(async () => 
    {
        const module = await Test.createTestingModule({
            controllers: [
                AuthorController
            ],
            providers: [
                AuthorService,
                {
                    provide: getRepositoryToken(Author),
                    useValue: mockRepository
                },
                {
                    provide: getRepositoryToken(Book),
                    useValue: mockRepository
                }
            ],
        }).compile();

        authorService = module.get<AuthorService>(AuthorService);;
        authorController = module.get<AuthorController>(AuthorController);
    });

    describe('all', () => 
    {
        it('AuthorController should be defined', () => 
        {
            expect(authorController).toBeDefined();
        });

        it('should return an array of authors', async () => 
        {
            const result = [
                {
                    id: 1,
                    name: 'Anderson, Perry',
                    books: []
                },
                {
                    id: 2,
                    name: 'Abraham, Tomás',
                    books: []
                }
            ];

            jest.spyOn(authorService, 'all').mockImplementation(() => new Promise((resolve, reject) => resolve(result)));
            expect(await authorController.all(mockResponse)).toBe(result);
        });
    });
});
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
                    uuid: '506cdab8-6542-4914-9337-d4a3b15924c2',
                    name: 'Anderson, Perry',
                    books: []
                },
                {
                    id: 2,
                    uuid: 'fd2ee82e-bf29-42cc-8202-aee59ef7972d',
                    name: 'Abraham, Tomás',
                    books: []
                }
            ];

            jest.spyOn(authorService, 'all').mockImplementation(() => new Promise(resolve => resolve(result)));
            expect(await authorController.all()).toBe(result);
        });
    });
});
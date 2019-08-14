import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '../../src/app.module';
import { BookService } from './../../src/book/services/book.service';

describe('Book', () => 
{
    const bookService = { all: () => ['test'] };

    let app: INestApplication;

    beforeAll(async () => 
    {
        const module = await Test.createTestingModule({
                imports: [AppModule],
            })
            .overrideProvider(BookService)
            .useValue(bookService)
            .compile();

        app = module.createNestApplication();
        await app.init();
    });

    it(`/GET book`, () => 
    {
        return request(app.getHttpServer())
            .get('/book')
            .expect(200)
            .expect(bookService.all());
    });

    afterAll(async () => 
    {
        await app.close();
    });
});
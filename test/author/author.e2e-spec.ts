import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { AppModule } from '../../src/app.module';
import { AuthorService } from './../../src/author/services/author.service';
import * as request from 'supertest';

describe('Author', () => 
{
    const authorService = { all: () => ['test'] };

    let app: INestApplication;

    beforeAll(async () => 
    {
        const module = await Test.createTestingModule({
                imports: [AppModule],
            })
            .overrideProvider(AuthorService)
            .useValue(authorService)
            .compile();

        app = module.createNestApplication();
        await app.init();
    });

    it(`/GET author`, () => 
    {
        return request(app.getHttpServer())
            .get('/author')
            .expect(200)
            .expect(authorService.all());
    });

    afterAll(async () => 
    {
        await app.close();
    });
});
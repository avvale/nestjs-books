import { ConfigModule } from './config/config.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { Author } from './author/entities/author.entity';
import { AuthorController } from './author/controllers/author.controller';
import { AuthorService } from './author/services/author.service';
import { Book } from './book/entities/book.entity';
import { BookController } from './book/controllers/book.controller';
import { BookService } from './book/services/book.service';
import { ReaderController } from './reader/controllers/reader.controller';
import { ReaderService } from './reader/services/reader.service';
import { Reader } from './reader/entities/reader.entity';

// graphql
import { AuthorResolver } from './author/graphql/author.resolver';
import { BookResolver } from './book/graphql/book.resolver';
import { ConfigService } from './config/config.service';

@Module({
    imports: [
        ConfigModule,
        GraphQLModule.forRoot({
            debug: true,
            playground: true,
            typePaths: ['./**/*.graphql'],
            definitions: {
                path: join(process.cwd(), 'src/graphql.ts')
            },
        }),
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: async (config: ConfigService) => ({
                "type": "mysql" as "mysql",
                "host": config.get('DATABASE_HOST'),
                "port": <number><unknown>config.get('DATABASE_PORT'),
                "username": config.get('DATABASE_USER'),
                "password": config.get('DATABASE_PASSWORD'),
                "database": config.get('DATABASE_SCHEMA'),
                "entities": [__dirname + '/**/*.entity{.ts,.js}'],
                "synchronize": true
            }),
            inject: [ConfigService]
        }),
        TypeOrmModule.forFeature([
            Author, 
            Book, 
            Reader
        ])
    ],
    controllers: [
        AuthorController,
        BookController,
        ReaderController
    ],
    providers: [
        ConfigModule,
        AuthorService, 
        BookService, 
        ReaderService,

        // resolvers
        AuthorResolver,
        BookResolver
    ],
})
export class AppModule {}

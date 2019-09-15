import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ConfigService } from './config/config.service';

async function bootstrap() 
{
    const app = await NestFactory.create(AppModule);

    const configService: ConfigService = app.get(ConfigService);

    // set swagger config
    const options = new DocumentBuilder()
        .setTitle('Books example')
        .setDescription('The books API description')
        .setVersion('1.0')
        .build();
    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('api', app, document);

    await app.listen(configService.get('APP_PORT'));
}
bootstrap();

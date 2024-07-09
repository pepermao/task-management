import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>(AppModule);
    const corsOptions: CorsOptions = {
        origin: 'http://localhost:3000',
        credentials: true,
    };

    app.useGlobalPipes(new ValidationPipe({
        transform: true,
        transformOptions: { enableImplicitConversion: true },
        whitelist: true,
    }))
    app.enableCors(corsOptions);

    await app.listen(8000);
}
bootstrap();

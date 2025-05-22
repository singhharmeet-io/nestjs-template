import helmet from 'helmet';
import morgan from 'morgan';
import cors from 'cors';
import * as express from 'express';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { INestApplication, ValidationPipe, Logger } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { RequestHandler } from '@nestjs/common/interfaces';

async function bootstrap() {
  const app = await NestFactory.create<INestApplication>(AppModule, {
    logger: ['log', 'error', 'warn'],
  });
  const logger = new Logger('bootstrap');

  /** initialize config service */
  const config = app.get<ConfigService>(ConfigService);

  /** initialize middleware */
  initMiddlewares(app);

  /** Setting a Redis Hybrid Connection */
  initRedisConnection(app, config);

  /** Setting Swagger documentation */
  initSwaggerDocs(app);
  logger.log('Swagger is available on /swaager-docs');

  const host: string = config.get('SERVICE_HOST')!;
  const port: number | string = config.get('SERVICE_PORT')!;

  /** Connecting all services & starting application */
  await app.startAllMicroservices();
  await app.listen(port, host);

  logger.log(`Application is running on http://${host}:${port}`);
}

/**
 * Initialize global middleware
 */
function initMiddlewares(app: INestApplication) {
  app.useGlobalPipes(new ValidationPipe());
  app.setGlobalPrefix('/api/v1');
  app.use(morgan('short') as RequestHandler);
  app.enableCors({ origin: '*' });
  app.use(helmet());
  app.use(helmet.dnsPrefetchControl());
  app.use(helmet.frameguard({ action: 'deny' }));
  app.use(helmet.hidePoweredBy());
  app.use(helmet.hsts());
  app.use(helmet.ieNoOpen());
  app.use(helmet.noSniff());
  app.use(helmet.permittedCrossDomainPolicies());
  app.use(helmet.referrerPolicy());
  app.use(helmet.xssFilter());
  app.use(
    helmet.contentSecurityPolicy({
      useDefaults: true,
      directives: { 'frame-ancestors': "'none'" },
    }),
  );
  app.use(express.json({ limit: '50mb' }));
  app.use(express.urlencoded({ limit: '50mb', extended: true }));
  app.use(express.json({ limit: '50mb' }));
  app.use(express.urlencoded({ limit: '50mb', extended: true }));
  app.use(cors());
}

/**
 * Hybrid Redis Microservice connection
 */
function initRedisConnection(app: INestApplication, config: ConfigService) {
  app.connectMicroservice<MicroserviceOptions>(
    {
      transport: Transport.REDIS,
      options: {
        host: config.get('REDIS_HOST'),
        port: config.get('REDIS_PORT'),
      },
    },
    { inheritAppConfig: true },
  );
}

/**
 * Initialize Swagger API documentation
 */
function initSwaggerDocs(app: INestApplication) {
  const config = new DocumentBuilder()
    .setTitle('Boilerplate')
    .setDescription('API Documentation.')
    .setVersion('1.0')
    .addTag('Backend')
    .addServer('http://localhost:3000')
    .setLicense('MIT Licence', 'www.example.com')
    .setContact('Harmeet Singh', 'https://harmeet.io', 'contact@harmeet.io')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger-docs', app, document, {
    useGlobalPrefix: false,
  });
}

void bootstrap();

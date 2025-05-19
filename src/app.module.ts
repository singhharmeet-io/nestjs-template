import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import * as path from 'path';
import { FeaturesModule } from './features/features.module';
import { InfraModule } from './@infra/infra.module';
import { SharedModule } from './shared/shared.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: path.resolve(
        process.cwd(),
        'src',
        '@config',
        '.env',
        `.env.${process.env.NODE_ENV}`,
      ),
      ignoreEnvFile: false,
      isGlobal: true,
      cache: true,
    }),
    InfraModule,
    FeaturesModule,
    SharedModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

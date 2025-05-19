import { Module } from '@nestjs/common';
import { postgreProviders } from './postgre.provider';

@Module({
  providers: [...postgreProviders],
  exports: [...postgreProviders],
})
export class PostgreModule {}

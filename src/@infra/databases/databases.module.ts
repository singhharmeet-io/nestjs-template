import { Module } from '@nestjs/common';
import { PostgreModule } from './postgre/postgre.module';

@Module({
  imports: [PostgreModule],
  exports: [PostgreModule],
})
export class DatabasesModule {}

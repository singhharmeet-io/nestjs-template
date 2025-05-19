import { Module } from '@nestjs/common';
import { DatabasesModule } from './databases/databases.module';
import { RedisModule } from './redis/redis.module';

@Module({
  imports: [DatabasesModule, RedisModule],
  exports: [DatabasesModule, RedisModule],
})
export class InfraModule {}

import {
  Global,
  Module,
  OnModuleDestroy,
  Inject,
  Logger,
} from '@nestjs/common';
import Redis from 'ioredis';
import config from 'src/@config';
import { REDIS_CLIENT } from 'src/shared/constants';
import { StringRedisService } from './string.redis.service';

@Global()
@Module({
  providers: [
    {
      provide: REDIS_CLIENT,
      useFactory: () => {
        const logger = new Logger('Redis');
        const redis = new Redis(
          `redis://${config.REDIS.HOST}:${config.REDIS.PORT}`,
        );

        redis.on('connect', () => {
          logger.log('Redis connected');
        });

        redis.on('error', (err) => {
          logger.error('Redis error', err.stack || err);
        });

        return redis;
      },
    },
    StringRedisService,
  ],
  exports: [REDIS_CLIENT, StringRedisService],
})
export class RedisModule implements OnModuleDestroy {
  private readonly logger = new Logger(RedisModule.name);

  constructor(@Inject(REDIS_CLIENT) private readonly redis: Redis) {}

  async onModuleDestroy() {
    await this.redis.quit();
    this.logger.log('🔌 Redis disconnected');
  }
}

import { Injectable } from '@nestjs/common';
import config from './@config';

@Injectable()
export class AppService {
  healthCheck(): string {
    return `Service is listening on ${config.SERVICE_PORT}`;
  }
}

import { Injectable } from '@nestjs/common';
import { HttpStatus } from '@nestjs/common';

@Injectable()
export class ResponseService {
  success(message: string, data: object = {}) {
    return {
      status: HttpStatus.OK,
      timestamp: new Date().toISOString(),
      message,
      ...(data && { data }),
    };
  }

  error400(message: string, data: object = {}) {
    return {
      status: HttpStatus.BAD_REQUEST,
      timestamp: new Date().toISOString(),
      message,
      data,
    };
  }

  error401(message: string, data: object = {}) {
    return {
      status: HttpStatus.UNAUTHORIZED,
      timestamp: new Date().toISOString(),
      message,
      data,
    };
  }

  error403(message: string, data: Record<string, unknown> = {}) {
    return {
      error: true,
      status: HttpStatus.FORBIDDEN,
      timestamp: new Date().toISOString(),
      message,
      data,
    };
  }
}

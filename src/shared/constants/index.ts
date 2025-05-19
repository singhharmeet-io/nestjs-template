import { SWAGGER_HEADERS } from './swagger/headers.swagger';
import { SWAGGER_OPERATIONS } from './swagger/operations.swagger';
import { SWAGGER_PROPERTIES } from './swagger/properties.swagger';

export const SEQUELIZE = 'SEQUELIZE';
export const REDIS_CLIENT = 'REDIS_CLIENT';

/** Swagger Documentation */
export const API_HEADERS = SWAGGER_HEADERS;
export const API_OPERATIONS = SWAGGER_OPERATIONS;
export const API_PROPERTIES = SWAGGER_PROPERTIES;

export const MODELS_REPOSITORIES = {
  USER: 'USER_REPOSITORY',
};

export const TIME = {
  JWT: {
    FIFTEEN_MINUTES: '15m',
    TWO_MINUTES: '2m',
    FIVE_DAYS: '5d',
    THIRTY_DAYS: '30d',
  },
  OTP: {
    OTP_EXPIRES: 5 * 60 * 1000,
  },
};

import User from 'src/@infra/databases/postgre/entities/users.entity';
import { MODELS_REPOSITORIES } from 'src/shared/constants';

export const userProviders = [
  {
    provide: MODELS_REPOSITORIES.USER,
    useValue: User,
  },
];

import config from '../../../@config';
import { Sequelize } from 'sequelize-typescript';
import { SEQUELIZE } from '../../../shared/constants';

export const postgreProviders = [
  {
    provide: SEQUELIZE,
    useFactory: async () => {
      const postgreURI: string = `postgres://${config.POSTGRE.DB_USER}:${config.POSTGRE.DB_PASS}@${config.POSTGRE.DB_HOST}:${config.POSTGRE.DB_PORT}/${config.POSTGRE.DB_NAME}`;
      /** create tables with seed files */
      const sequelize = new Sequelize(postgreURI);
      sequelize.addModels([__dirname + '/entities/**/*.entity{.ts,.js}']);
      await sequelize.sync({ force: false, alter: false });

      return sequelize;
    },
  },
];

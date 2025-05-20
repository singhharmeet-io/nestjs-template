import { Module } from '@nestjs/common';
import { SEQUELIZE } from 'src/shared/constants';
import { Sequelize } from 'sequelize-typescript';
import config from 'src/@config';

@Module({
  providers: [
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
  ],
  exports: [SEQUELIZE],
})
export class PostgreModule {}

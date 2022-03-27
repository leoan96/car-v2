// https://medium.com/@gausmann.simon/nestjs-typeorm-and-postgresql-full-example-development-and-project-setup-working-with-database-c1a2b1b11b8f
// https://geshan.com.np/blog/2021/12/docker-postgres/

import { TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

import { ConfigurationInterface } from './src/configuration/configuration.interface';
import { ConfigurationModule } from './src/configuration/configuration.module';
import { CONFIGURATION_SERVICE } from './src/configuration/configuration.constants';

export default (): TypeOrmModuleAsyncOptions => ({
  imports: [ConfigurationModule],
  useFactory: async (
    config: ConfigurationInterface,
  ): Promise<PostgresConnectionOptions> => ({
    type: 'postgres',
    host: await config.getTypeOrmHost(),
    port: await config.getTypeOrmPort(),
    username: await config.getTypeOrmUsername(),
    password: await config.getTypeOrmPassword(),
    database: await config.getTypeOrmDatabase(),
    entities: ['dist/**/*.entity{.ts,.js}'],
    migrations: ['dist/src/migrations/*.js'],
    migrationsRun: false,
    cli: {
      migrationsDir: 'src/migrations',
    },
    synchronize: false, // do not set as true in production (only set to true for local development)
  }),
  inject: [CONFIGURATION_SERVICE],
});

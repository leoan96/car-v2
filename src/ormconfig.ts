// https://medium.com/@gausmann.simon/nestjs-typeorm-and-postgresql-full-example-development-and-project-setup-working-with-database-c1a2b1b11b8f
// https://geshan.com.np/blog/2021/12/docker-postgres/

import { TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';

import { CONFIGURATION_SERVICE } from './configuration/configuration.constants';
import { ConfigurationInterface } from './configuration/configuration.interface';
import { ConfigurationModule } from './configuration/configuration.module';

export default (): TypeOrmModuleAsyncOptions => ({
  imports: [ConfigurationModule],
  useFactory: async (config: ConfigurationInterface) => ({
    type: 'postgres',
    host: await config.getTypeOrmHost(),
    port: await config.getTypeOrmPort(),
    username: await config.getTypeOrmUsername(),
    password: await config.getTypeOrmPassword(),
    database: await config.getTypeOrmDatabase(),
    entities: [__dirname + '/**/*.entity{.ts,.js}'],
    synchronize: false,
  }),
  inject: [CONFIGURATION_SERVICE],
});

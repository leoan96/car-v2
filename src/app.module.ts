import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigurationModule } from './configuration/configuration.module';
import { CustomLoggerModule } from './custom-logger/custom-logger.module';
import ormconfig from './ormconfig';

@Module({
  imports: [
    TypeOrmModule.forRootAsync(ormconfig()),
    ConfigurationModule,
    CustomLoggerModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ConfigurationModule } from './configuration/configuration.module';
import { CustomLoggerModule } from './custom-logger/custom-logger.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CarListingModule } from './car-listing/car-listing.module';
import { CarFeaturesModule } from './car-features/car-features.module';
import { CarAvailabilityModule } from './car-availability/car-availability.module';
import ormconfig from '../ormconfig';

@Module({
  imports: [
    TypeOrmModule.forRootAsync(ormconfig()),
    ConfigurationModule,
    CustomLoggerModule,
    CarListingModule,
    CarFeaturesModule,
    CarAvailabilityModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

import { Global, Module } from '@nestjs/common';
import { PublicApiConnectorService } from './public-api-connector.service';
import { HttpModule } from '@nestjs/axios';
import { ConfigService } from 'nestjs-config';
import { ConfigNames } from '../config/config-names.enum';
import { MongooseModule } from '@nestjs/mongoose';
import { PUBLIC_API, PublicApiSchemaFactory } from '../models/public-api.model';

@Global()
@Module({
  imports: [
    HttpModule.registerAsync({
      useFactory: (configService: ConfigService) =>
        configService.get(ConfigNames.publicApi),
      inject: [ConfigService],
    }),
    MongooseModule.forFeatureAsync([
      {
        name: PUBLIC_API,
        useFactory: PublicApiSchemaFactory,
      },
    ]),
  ],
  providers: [PublicApiConnectorService],
  exports: [PublicApiConnectorService],
})
export class PublicApiConnectorModule {}

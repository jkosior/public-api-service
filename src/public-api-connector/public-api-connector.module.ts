import { Global, Module } from '@nestjs/common';
import { PublicApiConnectorService } from './public-api-connector.service';
import { HttpModule } from '@nestjs/axios';
import { ConfigService } from 'nestjs-config';
import { ConfigNames } from '../config/config-names.enum';

@Global()
@Module({
  imports: [
    HttpModule.registerAsync({
      useFactory: (configService: ConfigService) =>
        configService.get(ConfigNames.publicApi),
      inject: [ConfigService],
    }),
  ],
  providers: [PublicApiConnectorService],
  exports: [PublicApiConnectorService],
})
export class PublicApiConnectorModule {}

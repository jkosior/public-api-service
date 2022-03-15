import { Module } from '@nestjs/common';
import { PublicApiConnectorService } from './public-api-connector.service';

@Module({
  providers: [PublicApiConnectorService],
})
export class PublicApiConnectorModule {}

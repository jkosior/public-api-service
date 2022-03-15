import { Inject, Injectable } from '@nestjs/common';
import { PublicApiConnectorService } from '../public-api-connector/public-api-connector.service';
import { Cron, CronExpression, Timeout } from '@nestjs/schedule';

@Injectable()
export class CronService {
  constructor(
    @Inject(PublicApiConnectorService)
    private readonly apiConnectorService: PublicApiConnectorService,
  ) {}

  @Timeout(1000)
  async handleStartupUpdate() {
    await this.apiConnectorService.updateApis();
  }

  @Cron(CronExpression.EVERY_HOUR)
  async handleHourlyUpdate() {
    await this.apiConnectorService.updateApis();
  }
}

import { Inject, Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { PublicAPIResponse } from './interface/public-api-response.interface';
import { firstValueFrom, map } from 'rxjs';
import { responseTransformer } from './helpers/response-transformer';
import { TransformedApi } from './interface/transformed-api.interface';
import { InjectModel } from '@nestjs/mongoose';
import { PUBLIC_API, TransformedApiModel } from '../models/public-api.model';
import { Model } from 'mongoose';
import { bulkWriteMapper } from './helpers/bulk-write-mapper';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';

@Injectable()
export class PublicApiConnectorService {
  private readonly entriesUrl = '/entries';

  constructor(
    private readonly httpService: HttpService,
    @InjectModel(PUBLIC_API)
    private readonly publicApiModel: Model<TransformedApiModel>,
    @Inject(WINSTON_MODULE_NEST_PROVIDER)
    private readonly logger: Logger,
  ) {}

  async updateApis(): Promise<void> {
    try {
      this.logger.info('Starting API list update');
      const apis = await this.getApisFromService();
      await this.publicApiModel.bulkWrite(bulkWriteMapper(apis));
      this.logger.info('API list updated');
    } catch (err) {
      this.logger.error('An error occurred during API list update');
      this.logger.error(err.message);
    }
  }

  private getApisFromService(): Promise<TransformedApi[]> {
    return firstValueFrom(
      this.httpService
        .get<PublicAPIResponse>(this.entriesUrl)
        .pipe(map(responseTransformer)),
    );
  }
}

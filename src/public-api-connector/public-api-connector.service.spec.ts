import { Test, TestingModule } from '@nestjs/testing';
import { PublicApiConnectorService } from './public-api-connector.service';

describe('PublicApiConnectorService', () => {
  let service: PublicApiConnectorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PublicApiConnectorService],
    }).compile();

    service = module.get<PublicApiConnectorService>(PublicApiConnectorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

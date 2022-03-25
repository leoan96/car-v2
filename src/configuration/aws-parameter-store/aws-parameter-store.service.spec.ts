import { Test, TestingModule } from '@nestjs/testing';

import { AWS_PARAMETER_STORE_CLIENT } from './aws-parameter-store.constants';
import { AwsParameterStoreService } from './aws-parameter-store.service';

describe('AwsParameterStoreService', () => {
  let service: AwsParameterStoreService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: AWS_PARAMETER_STORE_CLIENT,
          useValue: {
            send: () => 'value',
          },
        },
        AwsParameterStoreService,
      ],
    }).compile();

    service = module.get<AwsParameterStoreService>(AwsParameterStoreService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

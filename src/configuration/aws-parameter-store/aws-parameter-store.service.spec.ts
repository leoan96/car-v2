import { Test, TestingModule } from '@nestjs/testing';

import { AWS_PARAMETER_STORE_CLIENT } from './aws-parameter-store.constants';
import { CustomLoggerService } from '../../custom-logger/custom-logger.service';
import { AwsParameterStoreService } from './aws-parameter-store.service';

describe('AwsParameterStoreService', () => {
  let service: AwsParameterStoreService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: AWS_PARAMETER_STORE_CLIENT,
          useValue: {
            send: jest.fn(() => 'value'),
          },
        },
        {
          provide: CustomLoggerService,
          useValue: {
            log: jest.fn((message, ...metadata) =>
              console.log(message, metadata),
            ),
            error: jest.fn((message, ...metadata) =>
              console.log(message, metadata),
            ),
            warn: jest.fn((message, ...metadata) =>
              console.log(message, metadata),
            ),
            debug: jest.fn((message, ...metadata) =>
              console.log(message, metadata),
            ),
            verbose: jest.fn((message, ...metadata) =>
              console.log(message, metadata),
            ),
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

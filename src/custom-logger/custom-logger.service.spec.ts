import { Test, TestingModule } from '@nestjs/testing';

import { WINSTON_LOGGER } from './winston/winston.constants';
import { CustomLoggerService } from './custom-logger.service';

describe('CustomLoggerService', () => {
  let service: CustomLoggerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: WINSTON_LOGGER,
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
        CustomLoggerService,
      ],
    }).compile();

    service = module.get<CustomLoggerService>(CustomLoggerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

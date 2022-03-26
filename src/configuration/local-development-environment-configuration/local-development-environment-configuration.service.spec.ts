import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { LocalDevelopmentEnvironmentConfigurationService } from './local-development-environment-configuration.service';

describe('LocalDevelopmentEnvironmentConfigurationService', () => {
  let service: LocalDevelopmentEnvironmentConfigurationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: ConfigService,
          useValue: () => {
            get: (key) => {
              if (key === 'server') {
                return 3000;
              }
            };
          },
        },
        LocalDevelopmentEnvironmentConfigurationService,
      ],
    }).compile();

    service = module.get<LocalDevelopmentEnvironmentConfigurationService>(
      LocalDevelopmentEnvironmentConfigurationService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

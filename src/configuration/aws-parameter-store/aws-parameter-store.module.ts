import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { AwsSSMConfig } from '../config/aws_ssm';
import { AWS_PARAMETER_STORE_CLIENT } from './aws-parameter-store.constants';
import { AwsParameterStoreService } from './aws-parameter-store.service';

import { SSMClient } from '@aws-sdk/client-ssm';

@Module({
  providers: [
    {
      provide: AWS_PARAMETER_STORE_CLIENT,
      useFactory: (configService: ConfigService) => {
        const region = configService.get<AwsSSMConfig>('awsSSM').ssm_region;
        const client = new SSMClient({ region });
        return client;
      },
      inject: [ConfigService],
    },
    AwsParameterStoreService,
  ],
  exports: [AWS_PARAMETER_STORE_CLIENT, AwsParameterStoreService],
})
export class AwsParameterStoreModule {}

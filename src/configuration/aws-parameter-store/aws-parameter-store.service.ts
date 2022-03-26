import { Inject, Injectable } from '@nestjs/common';

import { AWS_PARAMETER_STORE_CLIENT } from './aws-parameter-store.constants';
import { ConfigurationInterface } from '../configuration.interface';
import { CustomLoggerService } from '../../custom-logger/custom-logger.service';

import { SSMClient, GetParameterCommand } from '@aws-sdk/client-ssm';

@Injectable()
export class AwsParameterStoreService implements ConfigurationInterface {
  private prefix_path: string;

  constructor(
    @Inject(AWS_PARAMETER_STORE_CLIENT)
    private readonly awsParameterStoreClient: SSMClient,
    private readonly logger: CustomLoggerService,
  ) {
    this.prefix_path = `/socar-v2/${process.env.NODE_ENV}`;
  }

  private async getParameterByName(name: string): Promise<string> {
    const command = new GetParameterCommand({
      Name: name,
    });

    let response;
    try {
      response = await (
        await this.awsParameterStoreClient.send(command)
      ).Parameter.Value;
    } catch (err) {
      this.logger.error('Error while calling awsParameterStoreClient.send', {
        context: 'aws-parameter-store.service',
        stack: err,
      });
    }
    return response;
  }

  public async getServerPort(): Promise<number> {
    return +(await this.getParameterByName(`${this.prefix_path}/SERVER_PORT`));
  }

  public async getFrontendUrl(): Promise<string> {
    return await this.getParameterByName(`${this.prefix_path}/FRONTEND_URL`);
  }
}

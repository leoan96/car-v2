import { Inject, Injectable } from '@nestjs/common';

import { AWS_PARAMETER_STORE_CLIENT } from './aws-parameter-store.constants';
import { ConfigurationInterface } from '../configuration.interface';

import { SSMClient, GetParameterCommand } from '@aws-sdk/client-ssm';

@Injectable()
export class AwsParameterStoreService implements ConfigurationInterface {
  private prefix_path: string;

  constructor(
    @Inject(AWS_PARAMETER_STORE_CLIENT)
    private readonly awsParameterStoreClient: SSMClient,
  ) {
    this.prefix_path = `/socar-v2/${process.env.NODE_ENV}`;
  }

  private async getParameterByName(name: string): Promise<number> {
    const command = new GetParameterCommand({
      Name: name,
    });

    let response;
    try {
      response = await (
        await this.awsParameterStoreClient.send(command)
      ).Parameter.Value;
    } catch (err) {
      // #TODO: replace console.log with logger when logger is set up
      console.log(err);
    }
    return response;
  }

  public async getServerPort(): Promise<number> {
    return this.getParameterByName(`${this.prefix_path}/SERVER_PORT`);
  }
}

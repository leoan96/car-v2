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
      WithDecryption: true,
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

  public async getTypeOrmHost(): Promise<string> {
    return await this.getParameterByName(`${this.prefix_path}/TYPE_ORM_HOST`);
  }

  public async getTypeOrmPort(): Promise<number> {
    return +(await this.getParameterByName(
      `${this.prefix_path}/TYPE_ORM_PORT`,
    ));
  }

  public async getTypeOrmUsername(): Promise<string> {
    return await this.getParameterByName(
      `${this.prefix_path}/TYPE_ORM_USERNAME`,
    );
  }

  public async getTypeOrmPassword(): Promise<string> {
    return await this.getParameterByName(
      `${this.prefix_path}/TYPE_ORM_PASSWORD`,
    );
  }

  public async getTypeOrmDatabase(): Promise<string> {
    return await this.getParameterByName(
      `${this.prefix_path}/TYPE_ORM_DATABASE`,
    );
  }

  public async getGoogleClientId(): Promise<string> {
    return await this.getParameterByName(
      `${this.prefix_path}/GOOGLE_CLIENT_ID`,
    );
  }
  public async getGoogleClientSecret(): Promise<string> {
    return await this.getParameterByName(
      `${this.prefix_path}/GOOGLE_CLIENT_SECRET`,
    );
  }
  public async getGoogleClientCallbackUrl(): Promise<string> {
    return await this.getParameterByName(
      `${this.prefix_path}/GOOGLE_CLIENT_CALLBACK_URL`,
    );
  }

  public async getJwtSecret(): Promise<string> {
    return await this.getParameterByName(`${this.prefix_path}/JWT_SECRET`);
  }

  public async getJwtExpiresIn(): Promise<string> {
    return await this.getParameterByName(`${this.prefix_path}/JWT_EXPIRES_IN`);
  }
}

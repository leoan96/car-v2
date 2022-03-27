import { config } from 'dotenv';
config();

import { SSMClient, GetParameterCommand } from '@aws-sdk/client-ssm';

const region = process.env.AWS_REGION;
const client = new SSMClient({ region });
const prefix_path = `/socar-v2/production`;

const getParameterByName = async (name: string): Promise<string> => {
  const command = new GetParameterCommand({
    Name: name,
    WithDecryption: true,
  });

  let response;
  try {
    response = await (await client.send(command)).Parameter.Value;
  } catch (err) {
    console.error(err);
    console.error('Error while calling awsParameterStoreClient.send');
  }
  return response;
};

const ssmConfigurationValues = async () => ({
  host: await getParameterByName(`${prefix_path}/TYPE_ORM_HOST`),
  port: await getParameterByName(`${prefix_path}/TYPE_ORM_PORT`),
  username: await getParameterByName(`${prefix_path}/TYPE_ORM_USERNAME`),
  password: await getParameterByName(`${prefix_path}/TYPE_ORM_PASSWORD`),
  database: await getParameterByName(`${prefix_path}/TYPE_ORM_DATABASE`),
});

// NOTE: if there are typeorm config in local environment variables,
// local environment variables would be used instead of values from aws ssm
const configValues = async () => {
  const values = await ssmConfigurationValues();
  return {
    type: 'postgres',
    host: process.env.TYPE_ORM_HOST || values.host,
    port: process.env.TYPE_ORM_PORT || values.port,
    username: process.env.TYPE_ORM_USERNAME || values.username,
    password: process.env.TYPE_ORM_PASSWORD || values.password,
    database: process.env.TYPE_ORM_DATABASE || values.database,
    entities: ['dist/**/*.entity{.ts,.js}'],
    migrations: ['dist/src/migrations/*.js'],
    migrationsRun: true,
    cli: {
      migrationsDir: 'src/migrations',
    },
    synchronize: false, // do not set as true in production (only set to true for local development)
  };
};

export = configValues();

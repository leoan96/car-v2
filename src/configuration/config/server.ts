export type ENVIRONMENT = 'development' | 'staging' | 'production';

export type ServerConfig = {
  port: number;
  environment: ENVIRONMENT;
};

export default (): ServerConfig => ({
  port: +process.env.SERVER_PORT || 3000,
  environment: (process.env.NODE_ENV as ENVIRONMENT) || 'development',
});

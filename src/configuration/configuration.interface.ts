export interface TypeOrmConfigurationInterface {
  getTypeOrmHost(): Promise<string> | string;
  getTypeOrmPort(): Promise<number> | number;
  getTypeOrmUsername(): Promise<string> | string;
  getTypeOrmPassword(): Promise<string> | string;
  getTypeOrmDatabase(): Promise<string> | string;
}

export interface GoogleOauthConfigurationInterface {
  getGoogleClientId(): Promise<string> | string;
  getGoogleClientSecret(): Promise<string> | string;
  getGoogleClientCallbackUrl(): Promise<string> | string;
}

export interface ConfigurationInterface
  extends TypeOrmConfigurationInterface,
    GoogleOauthConfigurationInterface {
  getServerPort(): Promise<number> | number;
  getFrontendUrl(): Promise<string> | string;
}

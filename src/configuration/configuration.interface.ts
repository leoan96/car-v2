export interface TypeOrmConfigurationInterface {
  getTypeOrmHost(): Promise<string> | string;
  getTypeOrmPort(): Promise<number> | number;
  getTypeOrmUsername(): Promise<string> | string;
  getTypeOrmPassword(): Promise<string> | string;
  getTypeOrmDatabase(): Promise<string> | string;
}

export interface ConfigurationInterface extends TypeOrmConfigurationInterface {
  getServerPort(): Promise<number> | number;
  getFrontendUrl(): Promise<string> | string;
}

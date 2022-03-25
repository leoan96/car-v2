export interface ConfigurationInterface {
  getServerPort(): Promise<number> | number;
}

export interface ConfigurationInterface {
  getServerPort(): Promise<number> | number;
  getFrontendUrl(): Promise<string> | string;
}

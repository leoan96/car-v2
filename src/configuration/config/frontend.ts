export type FrontendConfig = {
  url: string;
};

export default (): FrontendConfig => ({
  url: process.env.FRONTEND_URL || 'http://localhost:4001',
});

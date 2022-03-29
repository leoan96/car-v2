export type GoogleOauthConfig = {
  client_id: string;
  client_secret: string;
  client_callback_url: string;
};

export default (): GoogleOauthConfig => ({
  client_id: process.env.GOOGLE_CLIENT_ID,
  client_secret: process.env.GOOGLE_CLIENT_SECRET,
  client_callback_url:
    process.env.GOOGLE_CLIENT_CALLBACK_URL ||
    'http://localhost:4000/auth/google/redirect',
});

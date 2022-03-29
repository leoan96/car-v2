export type JwtConfig = {
  jwt_secret: string;
  jwt_expires_in: string;
};

export default (): JwtConfig => ({
  jwt_secret: process.env.JWT_SECRET,
  jwt_expires_in: process.env.JWT_EXPIRES_IN || '60s',
});

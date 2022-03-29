export type TypeOrmConfig = {
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
};

export default (): TypeOrmConfig => ({
  host: process.env.TYPE_ORM_HOST || 'localhost',
  port: +process.env.TYPE_ORM_PORT || 5432,
  username: process.env.TYPE_ORM_USERNAME || 'postgres',
  password: process.env.TYPE_ORM_PASSWORD || 'postgres',
  database: process.env.TYPE_ORM_DATABASE || 'postgres',
});

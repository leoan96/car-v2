import { createLogger, format, transports } from 'winston';

const { combine, timestamp, json, errors } = format;

export default createLogger({
  format: combine(
    errors({ stack: true }),
    timestamp(),
    // timestamp({
    //   format: 'YYYY-MM-DD HH:mm:ss',
    // }),
    json(),
  ),
  transports: [new transports.Console({ level: 'debug' })],
});

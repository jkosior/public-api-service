import { format, transports } from 'winston';

export default {
  transports: [
    new transports.Console({
      level: 'debug',
      format: format.prettyPrint({ colorize: true }),
    }),
  ],
  exitOnError: false,
};

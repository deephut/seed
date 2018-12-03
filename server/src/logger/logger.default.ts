import * as winston from 'winston';

export const defaultLoggingConfig = {
	transports: [
		new (winston.transports.Console)({
			level: 'debug',
			handleExceptions: false,
			prettyPrint: true,
			silent: false,
			timestamp: true,
			colorize: true,
			json: false
		})
	]
};

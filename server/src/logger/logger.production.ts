import * as winston from 'winston';

export const productionLoggingConfig = {
	transports: [
		new (winston.transports.Console)({
			level: 'debug',
			handleExceptions: false,
			prettyPrint: true,
			timestamp: true
		})
	]
};

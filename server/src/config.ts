import * as dotenv from 'dotenv';
import {Config} from 'knex';

/**
 * Load environment variables from .env file.
 */
dotenv.config();

const getString = (name: string): string => process.env[name];
const getNumber = (name: string): number => parseInt(getString(name), 10);
const getBoolean = (name: string): boolean => getString(name) === 'true';

interface ServerConfig {
	isProduction: boolean;
	serverPort: string;
	database: Config
}

export const config: ServerConfig = {
	isProduction: process.env.NODE_ENV === 'production',
	serverPort: process.env.SERVER_PORT,
	database: {
		client: 'pg',
		acquireConnectionTimeout: getNumber('DATABASE_ACQUIRE_CONNECTION_TIMEOUT'),
		connection: {
			debug: getBoolean('DATABASE_DEBUG'),
			host: getString('DATABASE_HOST'),
			user: getString('DATABASE_USER'),
			password: getString('DATABASE_PASSWORD'),
			database: getString('DATABASE_NAME'),
			requestTimeout: getString('DATABASE_REQUEST_TIMEOUT')
		},
		pool: {
			min: getNumber('DATABASE_POOL_MIN'),
			max: getNumber('DATABASE_POOL_MAX')
		},
		migrations: {
			directory: './src/database/migrations',
			tableName: 'migrations'
		}
	}
};

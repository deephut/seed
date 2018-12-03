import * as express from 'express';
import * as compression from 'compression';
import * as bodyParser from 'body-parser';
import * as errorHandler from 'errorhandler';
import * as lusca from 'lusca';
import * as expressCluster from 'express-cluster';
import {logger} from 'logger';
import {router} from 'router';
import {dbClient} from 'database/dbClient';
import {config} from 'config';
import * as cluster from 'cluster';
import {healthCheckHandler} from 'healthCheck';

const runServer = () => {
	const app = express();

	/**
	 * Configure server.
	 */
	app.set('port', process.env.SERVER_PORT)
		.use(compression())
		.use(bodyParser.json())
		.use(bodyParser.urlencoded({extended: true}))
		.use(lusca.xframe('SAMEORIGIN'))
		.use(lusca.xssProtection(true))
		.get('/health', healthCheckHandler)
		.use('/api', router)
		.use(errorHandler({
			log: (err: Error) => logger.error(err.stack ? err.stack.toString() : err.message)
		}));

	/**
	 * Start server.
	 */
	app.listen(
		app.get('port'),
		() => logger.debug(`  App is running at http://localhost:${app.get('port')} in ${app.get('env')} mode`) // tslint:disable-line no-console
	);

	const shutdown = () => {
		logger.info('Server received a shutdown signal, closing database connections and shutting down...');
		dbClient.destroy();
		process.exit();
	};

	// this is required to make nodemon && concurrent actually stop the server process
	process.on('SIGINT', shutdown);
	process.on('SIGTERM', shutdown);
};

if (config.isProduction && cluster.isMaster) {
	logger.info('Running in production, starting a worker per cpu.');
	expressCluster(runServer);
} else {
	runServer();
}

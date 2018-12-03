import {Request, Response} from 'express';
import {dbClient} from 'database/dbClient';

export const healthCheckHandler = (req: Request, res: Response) => {
	dbClient.raw('SELECT 1 = 1').then(
		() => res.status(200).end(),
		() => res.status(500).end()
	);
};

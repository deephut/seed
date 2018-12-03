import {NextFunction, Response} from 'express';
import * as Promise from 'bluebird';
import {ServiceError} from './ServiceError';

export class BaseController {
	protected sendError(res: Response): (err: any) => void {
		return (err: ServiceError) => res.status(err.statusCode).json(err);
	}

	protected sendValue(res: Response): (item: any) => void {
		return (item: any) => res.json(item);
	}

	protected sendPromise(promise: Promise<any>, res: Response, next: NextFunction): void {
		promise.then(
			this.sendValue(res),
			this.sendError(res)
		);
	}
}

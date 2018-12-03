import {NextFunction, Request, Response} from 'express';
import {TodosService, todosService} from './TodosService';
import {BaseController} from 'lib/BaseController';

export class TodosController extends BaseController {
	constructor(private service: TodosService = todosService) {
		super();
	}

	find = (req: Request, res: Response, next: NextFunction) => {
		this.sendPromise(this.service.find(), res, next);
	};

	create = (req: Request, res: Response, next: NextFunction) => {
		this.sendPromise(this.service.create(req.body), res, next);
	};

	update = (req: Request, res: Response, next: NextFunction) => {
		this.sendPromise(this.service.update(req.body), res, next);
	};

	deleteById = (req: Request, res: Response, next: NextFunction) => {
		this.sendPromise(this.service.deleteById(req.params.id), res, next);
	};
}

export const todosController = new TodosController();

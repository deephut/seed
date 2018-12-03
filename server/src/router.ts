import {Router} from 'express';
import {todosController} from 'todos/TodosController';

export const router = Router()
	.use(
		'/todos',
		Router()
			.get('', todosController.find)
			.post('', todosController.create)
			.patch('', todosController.update)
			.delete('/:id', todosController.deleteById)
	);

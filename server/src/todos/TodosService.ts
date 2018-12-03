import {TodosDao, todosDao} from './TodosDao';
import {CreateTodoEntity, TodoEntity} from 'service-entities/todos';
import * as Promise from 'bluebird';

export class TodosService {
	constructor(private dao: TodosDao = todosDao) {
	}

	find(): Promise<TodoEntity> {
		return this.dao.find();
	}

	create(todo: CreateTodoEntity): Promise<TodoEntity> {
		return this.dao.create(todo);
	}

	update(todo: Partial<TodoEntity>): Promise<TodoEntity> {
		return this.dao.update(todo);
	}

	deleteById(id: number): Promise<boolean> {
		return this.dao.deleteById(id);
	}
}

export const todosService = new TodosService();

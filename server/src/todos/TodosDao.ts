import {TimestampedPersistence} from 'lib/TimestampedPersistence';
import * as Promise from 'bluebird';
import {BaseDao} from 'lib/BaseDao';

export const TODOS_TABLE = 'todos';

export interface CreateTodoPersistence {
	text: string;
}

export interface TodoPersistence extends CreateTodoPersistence, TimestampedPersistence {
	id: number;
}

export class TodosDao extends BaseDao {
	find(): Promise<TodoPersistence> {
		return this.db(TODOS_TABLE)
			.select('*');
	}

	create(todo: CreateTodoPersistence): Promise<TodoPersistence> {
		return this.db(TODOS_TABLE)
			.insert(todo)
			.returning('*')
			.get(0);
	}

	update(todo: Partial<TodoPersistence>): Promise<TodoPersistence> {
		return this.db(TODOS_TABLE)
			.update({...todo, updatedAt: new Date()})
			.where({id: todo.id})
			.returning('*')
			.get(0);
	}

	deleteById(id: number): Promise<boolean> {
		return this.db(TODOS_TABLE)
			.where({id})
			.del()
			.then(this.isSuccessfullyDeleted);
	}
}

export const todosDao = new TodosDao();

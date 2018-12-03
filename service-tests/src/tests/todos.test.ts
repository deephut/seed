import {client} from 'client';
import {CreateTodoEntity, TodoEntity} from 'service-entities/todos';
import {Response} from 'supertest';
import DoneCallback = jest.DoneCallback;

const TODOS_PATH = '/api/todos';

describe('/todos', () => {
	it('should add todos, update one, then delete one', (done: DoneCallback) => {
		const todo1: CreateTodoEntity = {text: 'foo'};
		const todo2: CreateTodoEntity = {text: 'foo2'};
		let createdTodo1: TodoEntity;
		let createdTodo2: TodoEntity;
		let updatedTodo: TodoEntity;

		Promise.all([
			client.post(TODOS_PATH).send(todo1).expect(200),
			client.post(TODOS_PATH).send(todo2).expect(200)
		])
			.then(
				([response1, response2]: Response[]) => {
					createdTodo1 = response1.body;
					createdTodo2 = response2.body;

					expect(createdTodo1.id).toBeDefined();
					expect(createdTodo1.text).toBe(todo1.text);
					expect(createdTodo2.id).toBeDefined();
					expect(createdTodo2.text).toBe(todo2.text);

					return client.get(TODOS_PATH).expect(200);
				})
			.then(
				(findResponse: Response) => {
					const todos: TodoEntity[] = findResponse.body;

					expect(todos).toEqual([createdTodo1, createdTodo2]);

					return client.patch(TODOS_PATH)
						.send({...createdTodo2, text: 'foo3'})
						.expect(200);
				})
			.then(
				(updateResponse: Response) => {
					updatedTodo = updateResponse.body;

					expect(updatedTodo.id).toBe(createdTodo2.id);
					expect(updatedTodo.text).toBe('foo3');

					return client.get(TODOS_PATH)
						.expect(200);
				})
			.then(
				(findResponse2: Response) => {
					const todos: TodoEntity[] = findResponse2.body;

					expect(todos).toEqual([createdTodo1, updatedTodo]);

					return client.delete(`${TODOS_PATH}/${createdTodo1.id}`)
						.expect(200);
				})
			.then(() => client.get(TODOS_PATH).expect(200))
			.then(
				(findResponse3: Response) => {
					const todos3: TodoEntity[] = findResponse3.body;

					expect(todos3).toEqual([updatedTodo]);

					done();
				}
			);
	});
});

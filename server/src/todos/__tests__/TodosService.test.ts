import {TodosDao} from 'todos/TodosDao';
import {TodosService} from 'todos/TodosService';

const find = jest.fn();
const create = jest.fn();
const update = jest.fn();
const deleteById = jest.fn();

const TodosDaoMock = jest.fn<TodosDao>().mockImplementation(() => ({
	find,
	create,
	update,
	deleteById
}));
const todosService = new TodosService(new TodosDaoMock());

describe('TodosService', () => {
	beforeEach(() => jest.resetAllMocks());

	it('calls find on the dao', () => {
		todosService.find();

		expect(find).toHaveBeenCalled();
	});

	it('calls create on the dao', () => {
		const todo = { text: 'foo', createdAt: new Date(), updatedAt: new Date() };

		todosService.create(todo);

		expect(create).toHaveBeenCalledWith(todo);
	});

	it('calls update on the dao', () => {
		const todo = { text: 'foo' };

		todosService.update(todo);

		expect(update).toHaveBeenCalledWith(todo);
	});

	it('calls deleteById on the dao', () => {
		const id = 101;

		todosService.deleteById(id);

		expect(deleteById).toHaveBeenCalledWith(id);
	});
});

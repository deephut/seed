import {TodosListStore} from '../TodosListStore';
import {CrudService} from 'lib/CrudService';
import {TodoEntity, CreateTodoEntity} from 'service-entities/todos';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {TodosSearchStore} from 'todos/TodosList/TodosListSearch/TodosListSearchStore';
import DoneCallback = jest.DoneCallback;

const serviceFind = ({then: jest.fn()});
const serviceCreate = ({then: jest.fn()});
const todosNext = jest.fn();
const searchText$ = new BehaviorSubject<string>('');
const TodosSubjectMock = jest.fn<BehaviorSubject<TodoEntity[]>>(() => ({
	next: todosNext,
	value: []
}));
const ServiceMock = jest.fn<CrudService<TodoEntity, CreateTodoEntity>>(() => ({
	find: () => serviceFind,
	create: () => serviceCreate
}));
const SearchStoreMock = jest.fn<TodosSearchStore>(() => ({
	searchText$
}));

const todos = new TodosSubjectMock();
const service = new ServiceMock();
const searchStore = new SearchStoreMock();

describe('TodosListStore', () => {

	beforeEach(() => jest.resetAllMocks());

	it('calls service on refresh', () => {
		const store = new TodosListStore(todos, service, searchStore);

		store.refresh();

		expect(serviceFind.then).toHaveBeenCalledTimes(1);

		const successCallback = serviceFind.then.mock.calls[0][0];
		const todosFromServer = [{}, {}];

		successCallback(todosFromServer);

		expect(todosNext).toBeCalledWith(todosFromServer);
	});

	it('calls service on addTodo', () => {
		const store = new TodosListStore(todos, service, searchStore);
		const newTodo = {text: 'todo'};

		store.addTodo(newTodo);

		expect(serviceCreate.then).toHaveBeenCalledTimes(1);

		const successCallback = serviceCreate.then.mock.calls[0][0];
		const newTodoFromServer = {id: 1, ...newTodo};

		successCallback(newTodoFromServer);

		expect(todosNext).toBeCalledWith([newTodoFromServer]);
	});

	it('filters todos by search text', (done: DoneCallback) => {
		const initialTodos = [
			{id: 1, text: 'a', createdAt: new Date(), updatedAt: new Date()},
			{id: 2, text: 'b', createdAt: new Date(), updatedAt: new Date()}
		];
		const todosSubject = new BehaviorSubject<TodoEntity[]>(initialTodos);
		const store = new TodosListStore(todosSubject, service, searchStore);
		let callCnt = 0;

		store.todos$.subscribe((filteredTodos: TodoEntity[]) => {
			callCnt++;

			switch (callCnt) {
				case 1:
					expect(filteredTodos).toEqual(initialTodos);
					break;
				case 2:
					expect(filteredTodos).toEqual([initialTodos[0]]);
					done();
					break;
				default:
					done.fail();
			}
		});

		searchText$.next('a');
	});
});

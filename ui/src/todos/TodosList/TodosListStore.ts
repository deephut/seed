import {TodosService} from 'todos/TodosService';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {CreateTodoEntity, TodoEntity} from 'service-entities/todos';
import {Observable} from 'rxjs/Observable';
import {todosSearchStore, TodosSearchStore} from 'todos/TodosList/TodosListSearch/TodosListSearchStore';
import {CrudService} from 'lib/CrudService';

export class TodosListStore {

	constructor(
		private serverTodos$: BehaviorSubject<TodoEntity[]> = new BehaviorSubject<TodoEntity[]>([]),
		private service: CrudService<TodoEntity, CreateTodoEntity> = TodosService,
		private searchStore: TodosSearchStore = todosSearchStore
	) {}

	todos$ = Observable.combineLatest(
		this.serverTodos$,
		this.searchStore.searchText$,
		(todos: TodoEntity[], searchText: string) =>
			todos.filter((todo: TodoEntity) => (searchText.length > 0) ? todo.text.includes(searchText) : true)
	);

	refresh = () => this.service.find().then((todos: TodoEntity[]) => this.serverTodos$.next(todos));

	addTodo = (todo: CreateTodoEntity) =>
		this.service.create(todo).then(
			(addedTodo: TodoEntity) => this.serverTodos$.next(this.serverTodos$.value.concat(addedTodo))
		);
}

export const todosListStore = new TodosListStore();

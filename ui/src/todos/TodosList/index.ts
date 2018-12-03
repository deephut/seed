import {TodosListComponent} from 'todos/TodosList/TodosListComponent';
import {TodosListComponentProps} from 'todos/TodosList/TodosListComponentProps';
import {todosListStore} from 'todos/TodosList/TodosListStore';
import {withObservable} from 'lib/withObservable';
import combineLatestObj from 'lib/combineLatestObj';

const TodosListObservable = combineLatestObj<TodosListComponentProps>({
	todos: todosListStore.todos$,
	refresh: todosListStore.refresh,
	addTodo: todosListStore.addTodo
});

export const TodosList = withObservable<TodosListComponentProps>(TodosListObservable)(TodosListComponent);

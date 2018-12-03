import {TodoEntity} from 'service-entities/todos';

export interface TodosListComponentProps {
	todos: TodoEntity[];
	refresh: () => void;
	addTodo: (todo: Partial<TodoEntity>) => void;
}

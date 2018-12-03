import {CrudService} from 'lib/CrudService';
import {TodoEntity, CreateTodoEntity} from 'service-entities/todos';

export const TodosService = new CrudService<TodoEntity, CreateTodoEntity>('/api/todos');

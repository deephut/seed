declare module 'service-entities/todos' {
	import {TimestampedEntity} from 'service-entities/timestamped-entity';

	export interface CreateTodoEntity {
		text: string;
	}

	export interface TodoEntity extends CreateTodoEntity, TimestampedEntity {
		id: number;
	}
}

declare module 'service-entities/users' {
	import {TimestampedEntity} from 'service-entities/timestamped-entity';

	export interface CreateUserEntity {
		email: string;
		password: string;
	}

	export interface UserEntity extends TimestampedEntity {
		id: number;
		email: string;
		password: string;
		isActive: boolean;
	}
}

import axios from 'axios';

type Resolver<T> = (value?: T | PromiseLike<T>) => void;
type Rejecter = (reason?: any) => void;
type Response<T> = { data: T };
type ServiceError = any;

export class CrudService<T, C> {

	constructor(private baseUrl: string = '') {
	}

	find(params?: object): Promise<T[]> {
		return new Promise<T[]>((resolve: Resolver<T[]>, reject: Rejecter) => {
			axios.get(this.baseUrl, {params})
				.then((response: Response<T[]>) => resolve(response.data))
				.catch((err: ServiceError) => reject(err));
		});
	}

	findById(id: number | string): Promise<T> {
		return new Promise<T>((resolve: Resolver<T>, reject: Rejecter) => {
			axios.get(`${this.baseUrl}/${id}`)
				.then((response: Response<T>) => resolve(response.data))
				.catch((err: ServiceError) => reject(err));
		});
	}

	create(model: C): Promise<T> {
		return new Promise<T>((resolve: Resolver<T>, reject: Rejecter) => {
			axios.post(this.baseUrl, model)
				.then((response: Response<T>) => resolve(response.data))
				.catch((err: ServiceError) => reject(err));
		});
	}

	replace(id: number | string, model: T): Promise<T> {
		return new Promise<T>((resolve: Resolver<T>, reject: Rejecter) => {
			axios.put(`${this.baseUrl}/${id}`)
				.then((response: Response<T>) => resolve(response.data))
				.catch((err: ServiceError) => reject(err));
		});
	}

	update(id: number | string, model: T): Promise<T> {
		return new Promise<T>((resolve: Resolver<T>, reject: Rejecter) => {
			axios.patch(`${this.baseUrl}/${id}`)
				.then((response: Response<T>) => resolve(response.data))
				.catch((err: ServiceError) => reject(err));
		});
	}

	'delete'(id: number | string): Promise<void> {
		return new Promise<void>((resolve: Resolver<void>, reject: Rejecter) => {
			axios.delete(`${this.baseUrl}/${id}`)
				.then(() => resolve())
				.catch((err: ServiceError) => reject(err));
		});
	}
}

import Home from 'home/Home';
import NotFound from 'errors/NotFound';
import {TodosList} from 'todos/TodosList';

const NOT_FOUND_ROUTE: string = '@@router5/UNKNOWN_ROUTE';

export interface Route {
	[name: string]: {
		path: string;
		component: React.ComponentClass<{}>;
		children?: Route;
		params?: object;
	};
}

/**
 * Configuration of routes to components
 */
export const routes: Route = {
	index: {
		path: '/',
		component: Home
	},
	home: {
		path: '/home',
		component: Home
	},
	todos: {
		path: '/todos',
		component: TodosList
	},
	[NOT_FOUND_ROUTE]: {
		path: '/oh-no',
		component: NotFound
	}
};

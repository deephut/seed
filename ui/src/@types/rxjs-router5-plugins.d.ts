declare module 'rxjs-router5' {
	import {Router5} from 'router5';
	import {Observable} from 'rxjs/Observable';

	export interface RouteState {
		_meta: Array<Object>;
		name: String;
		params: Object;
	}

	export interface RouterEvent {
		toState?: RouteState;
		fromState?: RouteState;
		error?: any;
	}

	var createObservables: (router: Router5) => {
		route$: Observable<RouteState>;
		routeNode: (routeName: string) => Observable<RouteState>;
		transitionError$: Observable<RouterEvent>;
		transitionRoute$: Observable<RouterEvent>;
	};

	export default createObservables;
}

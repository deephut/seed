import createObservables, {RouterEvent, RouteState} from 'rxjs-router5';
import router5CreateRouter, {Router5} from 'router5';
import listenersPlugin from 'router5/plugins/listeners';
import browserPlugin from 'router5/plugins/browser';
import 'rxjs/add/observable/combineLatest';
import {Observable} from 'rxjs/Observable';

// routes are added in RouterModel.ts
const router: Router5 = router5CreateRouter(undefined, {allowNotFound: true, strictQueryParams: false})
	.usePlugin(browserPlugin())
	.usePlugin(listenersPlugin());

const {route$, transitionError$, transitionRoute$} = createObservables(router);

export interface RoutingStore {
	router: Router5;
	route$: Observable<RouteState>;
	transitionError$: Observable<RouterEvent>;
	transitionRoute$: Observable<RouterEvent>;
}

export const Routing: RoutingStore = {
	router,
	route$: route$.map((state: RouteState) => state == null ? router.getState() as RouteState : state),
	transitionError$,
	transitionRoute$: transitionRoute$.map((event: RouterEvent) => {
		if (event == null) {
			// this is the first router event which is null for some reason so we populate it from the current router state
			return {
				fromState: undefined,
				toState: router.getState() as RouteState
			};
		}

		return event;
	})
};

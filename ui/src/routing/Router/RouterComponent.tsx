import * as React from 'react';
import {SPC} from 'lib/SPC';
import {RouterComponentProps} from 'routing/Router/RouterComponentProps';
import {Route} from 'routing/routes';

export class RouterComponent extends SPC<RouterComponentProps> {
	render() {
		const {routes, routeNames} = this.props;

		return routesToComponents(routes, routeNames || []);
	}
}

/**
 * Use the route names to look up and return the appropriate Component tree in the route configuration.
 *
 * @param nestedRoute
 * @param routeNames
 * @return Component
 */
function routesToComponents(nestedRoute?: Route, routeNames?: string[]): JSX.Element | null {
	if (nestedRoute == null || routeNames == null || routeNames.length === 0) {
		return null;
	}

	const route = nestedRoute[routeNames[0]];
	const Component = route.component;

	if (routeNames.length === 1) {
		return <Component/>;
	}

	return <Component>{routesToComponents(route.children, routeNames.slice(1))}</Component>;
}

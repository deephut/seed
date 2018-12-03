import * as React from 'react';
import {SPC} from 'lib/SPC';
import {LinkProps} from 'routing/Link/LinkProps';
import {Router5} from 'router5';
import {MouseEvent} from 'react';

interface BaseLinkProps extends LinkProps {
	router: Router5;
}

/**
 * This component takes the properties of a link and an active Router5 router and will use the router to navigate to the link.
 */
export class BaseLink extends SPC<BaseLinkProps> {
	render() {
		const {router, routeName, routeParams = {}, className, children} = this.props;
		const href = router.buildUrl(routeName, routeParams) as string;

		return <a href={href} className={className} onClick={this.handleOnClick}>{children}</a>;
	}

	handleOnClick = (evt: MouseEvent<HTMLAnchorElement>) => {
		const {router, routeName, routeParams = {}, routeOptions = {}} = this.props;
		const comboKey = evt.metaKey || evt.altKey || evt.ctrlKey || evt.shiftKey;

		if (evt.button === 0 && !comboKey) {
			evt.preventDefault();
			router.navigate(routeName, routeParams, routeOptions);
		}
	}
}

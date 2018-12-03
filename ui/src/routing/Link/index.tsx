import * as React from 'react';
import {SPC} from 'lib/SPC';
import {BaseLink} from 'routing/Link/BaseLink';
import {Routing} from 'routing/stores/RoutingStore';
import {LinkProps} from 'routing/Link/LinkProps';

/**
 * Connect the active router to a BaseLink component.
 */
export class Link extends SPC<LinkProps> {
	render() {
		return <BaseLink {...this.props} router={Routing.router}/>;
	}
}

import {withObservable} from 'lib/withObservable';
import {RouterModel} from 'routing/Router/RouterModel';
import {RouterComponent} from 'routing/Router/RouterComponent';

export const Router = withObservable(RouterModel)(RouterComponent);

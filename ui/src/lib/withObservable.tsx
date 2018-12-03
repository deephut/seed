import * as React from 'react';
import {Observable} from 'rxjs/Observable';
import {Subscription} from 'rxjs/Subscription';
import {hocLogger} from './hocLogger';

interface WithObservableState<S> {
	wrappedComponentProps: S;
}

type WithObservableType<P> = new() => React.PureComponent<{}, WithObservableState<P>>;

export function withObservable<P>(observable: Observable<P>): (wc: React.ComponentClass<P>) => WithObservableType<P> {

	return function (WrappedComponent: React.ComponentClass<P>): WithObservableType<P> {
		const wrappedComponentName = WrappedComponent.displayName || WrappedComponent.name;

		return class WithObservable extends React.PureComponent<{}, WithObservableState<P>> {
			static displayName = `WithObservable(${wrappedComponentName})`;

			subscription?: Subscription;

			componentDidMount() {
				this.subscription = observable.subscribe((wrappedComponentProps: P) => {
					this.setState({wrappedComponentProps});
				});
			}

			componentWillUnmount() {
				if (this.subscription) {
					this.subscription.unsubscribe();
				}
			}

			render() {
				if (this.state == null) {
					return null;
				}

				hocLogger(WithObservable.displayName, this.state.wrappedComponentProps);

				return React.createElement(WrappedComponent, Object.assign({}, this.props, this.state.wrappedComponentProps));
			}
		};
	};
}

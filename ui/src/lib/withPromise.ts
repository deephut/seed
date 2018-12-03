import * as React from 'react';
import {ComponentClass, PureComponent, StatelessComponent} from 'react';
import {hocLogger} from './hocLogger';

export type PromiseCaller<D> = () => Promise<D>;

interface WithPromiseState<D> {
	promiseData?: D;
	promiseError?: object;
	loaded: boolean;
}

// from recompose
type Component<P> = ComponentClass<P> | StatelessComponent<P>;
interface ComponentEnhancer<TInner, TOutter> {
	(component: Component<TInner>): ComponentClass<TOutter>;
}

export function withPromise<TOutter>(promiseCaller: PromiseCaller<TOutter>): ComponentEnhancer<WithPromiseState<TOutter>, TOutter> {

	return function (WrappedComponent: React.ComponentClass<WithPromiseState<TOutter>>): ComponentClass<TOutter> {
		const wrappedComponentName = WrappedComponent.displayName || WrappedComponent.name;

		return class WithPromise extends PureComponent<TOutter, WithPromiseState<TOutter>> {
			static displayName = `WithPromise(${wrappedComponentName})`;
			_cancel: boolean = false;

			componentDidMount() {
				promiseCaller().then(
					(data: TOutter) => this.setResponse(data),
					(error: object) => this.setResponse(undefined, error)
				);
			}

			componentWillUnmount() {
				this._cancel = true;
			}

			setResponse(promiseData?: TOutter, promiseError?: object) {
				if (this._cancel) {
					return;
				}

				this.setState({promiseData, promiseError, loaded: true});
			}

			render() {
				if (this.state == null) {
					return null;
				}

				hocLogger(WithPromise.displayName, this.state);

				return React.createElement(WrappedComponent, Object.assign({}, this.props, this.state));
			}
		};
	};
}

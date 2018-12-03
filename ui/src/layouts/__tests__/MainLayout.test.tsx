import * as React from 'react';
import {createRenderer} from 'react-test-renderer/shallow';
import {MainLayout} from '../MainLayout';

const renderer = createRenderer();

describe('MainLayout', () => {

	it('renders correctly', () => {
		renderer.render(<MainLayout><div id='content'/></MainLayout>);

		expect(renderer.getRenderOutput()).toMatchSnapshot();
	});
});

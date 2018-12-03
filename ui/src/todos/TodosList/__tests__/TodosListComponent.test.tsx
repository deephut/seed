import * as React from 'react';
import {createRenderer} from 'react-test-renderer/shallow';
import {TodosListComponent} from 'todos/TodosList/TodosListComponent';

const renderer = createRenderer();

describe('TodosListComponent', () => {

	it('renders correctly', () => {
		const props = {
			todos: [{id: 1, text: 'text', createdAt: new Date(0), updatedAt: new Date(0)}],
			refresh: jest.fn(),
			addTodo: jest.fn()
		};

		renderer.render(<TodosListComponent {...props}/>);

		expect(renderer.getRenderOutput()).toMatchSnapshot();
	});
});

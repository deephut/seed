import {HomePage} from '../pages/HomePage';

describe('home page', () => {
	it('should have a todos link', () => {
		HomePage.open();

		expect(HomePage.todosLink.getAttribute('href')).toContain('/todos');
	});
});

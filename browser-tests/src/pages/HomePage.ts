
class HomePageModule {

	public get todosLink() { return browser.element('#todos-link a') }

	public open(): void {
		browser.url('/');
	}
}

export const HomePage = new HomePageModule();

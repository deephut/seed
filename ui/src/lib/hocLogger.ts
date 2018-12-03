export const hocLogger = process.env.NODE_ENV === 'production'
	? () => null
	: (name: string, data: any) => console.log(`${name}: `, data); // tslint:disable-line:no-console

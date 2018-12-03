declare module 'superagent-debugger' {
	import {Request, Plugin} from 'superagent';

	type LogFunction = (req: Request) => void;
	const superdebug: (logFunction: LogFunction, options?: object) => Plugin;

	export default superdebug;
}

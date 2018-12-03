declare module 'express-cluster' {
	const cluster: (workerFunction: Function, config?: Object) => void;

	export = cluster;
}

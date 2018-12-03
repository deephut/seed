import superdebug from 'superagent-debugger';

export const logger = superdebug(console.info);

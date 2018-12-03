import * as winston from 'winston';
import {defaultLoggingConfig} from './logger.default';
import {productionLoggingConfig} from './logger.production';
import {config} from 'config';

export const logger = new winston.Logger(config.isProduction ? productionLoggingConfig : defaultLoggingConfig);

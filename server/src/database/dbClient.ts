import * as Knex from 'knex';
import {config} from 'config';

export const dbClient: Knex = Knex(config.database);

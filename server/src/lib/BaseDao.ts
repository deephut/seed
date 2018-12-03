import * as Knex from 'knex';
import {dbClient} from 'database/dbClient';

export abstract class BaseDao {
	constructor(protected db: Knex = dbClient) {

	}

	protected isSuccessfullyDeleted(numRows: number) {
		return numRows > 0
	}
}

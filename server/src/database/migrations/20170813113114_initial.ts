import * as Knex from 'knex';
import * as Promise from 'bluebird';
import {CreateTableBuilder} from 'knex';

exports.up = function (knex: Knex): Promise<any> {
	return knex.schema.createTable('todos', function (table: CreateTableBuilder) {
			table.increments();
			table.string('text');
			table.timestamp('createdAt').defaultTo(knex.fn.now());
			table.timestamp('updatedAt').defaultTo(knex.fn.now());
		});
};

exports.down = function (knex: Knex): Promise<any> {
	return Promise.all([
		knex.schema.dropTable('todos')
	]);
};

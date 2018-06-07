// this is a knex seed file.

// 1. clear all the tables

const knexMigrations = [
	'knex_migrations',
	'knex_migrations_lock',
];
const productSchema = [
	'product_lines',
	'product_collections',
	'product_collections__products',
	'products',
	'product_variants',
	'product_categories',
	'product_classes',
	'product_stocks',
	'products_sold',
	'product_locations',
];
const permsSchema = [
	'resources',
	'resource_permissions',
	'permissions',
	'resource_types',
	'system_roles',
];
const users = [
	'users',
	'sellers'
];

function seed(knex, Promise) {

	async function forceDropSchema(name){
		try {
			console.log('deleting ... ', name);
			return await knex.raw(`DROP TABLE ${name} CASCADE`);
		} catch(e) {
			console.log('could not delete ... ', name);
			return null;
		}
	};

	async function deleteSchemas(schemas) {
		try {
			const wait = await Promise.all(schemas.map(schema => {
				return Promise.all(schema.map(table => { return forceDropSchema(table);}));
			}));
			return true;
		} catch (e) {
			console.log('failed ', e);
		}

	}

	return deleteSchemas([knexMigrations, users, productSchema, permsSchema]);

}

exports.seed = seed;
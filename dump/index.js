// this is a knex seed file.

// 1. clear all the tables

const productSchema = [
	'product_lines',
	'product_collections',
	'product_collections__products',
	'products'.
	'product_variants',
	'product_categories',
	'product_classes',
	'product_stocks',
	'products_sold',
	'product_locations',
];
const permsSchema = [
	'resources',
	'resource_permissions'
];
const users = [
	'users',
	'sellers'
];

function seed(knex, Promise) {

	const forceDropSchema = (name) => {
		return knex.raw(`DROP TABLE ${name} CASCADE`);
	};

	async function deleteSchemas(schemas) {
		const wait = await Promise.all(schemas.map(schema => {
			await Promise.all(schema.map(table => await forceDropSchema(name)));
			return true;
		}));
	}

	return deleteSchemas([productSchema, permsSchema, users]);

}e

exports.seed = seed;
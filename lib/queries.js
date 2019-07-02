const { client } = require('./db');

async function executeQuery(table, column = 1, value = 1) {
	const query = `SELECT * FROM ${table} WHERE ${column}=$1`,
		args = [value];

	const { rows } = await client.query(query, args);

	return rows;
}

async function getEntityById(entity, id) {
	return (await executeQuery(entity, 'id', id))[0];
}

module.exports = {
	getAllWeapons: async () => await executeQuery('weapons'),
	queryWeaponsByType: async type => await executeQuery('weapons', 'type', type),
	getWeapon: async id => await getEntityById('weapons', id),
	getAllPlants: async () => await executeQuery('plants'),
	getPlant: async id => await getEntityById('plants', id),
	getAllAnimals: async () => await executeQuery('animals'),
	getAnimal: async id => await getEntityById('animals', id),
	getAllItems: async () => await executeQuery('items'),
	queryItemsByCategory: async category => await executeQuery('items', 'category', category),
	getItem: async id => await getEntityById('items', id)
};

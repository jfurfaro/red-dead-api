const { client } = require('./db');

module.exports = {
	async getAllWeapons() {
		const query = 'SELECT * FROM weapons';

		const { rows: weapons } = await client.query(query);

		return weapons;
	},

	async queryWeaponsByType(type) {
		const query = 'SELECT * FROM weapons WHERE type=$1';

		const { rows: weapons } = await client.query(query, [type]);

		return weapons;
	},

	async getWeapon(id) {
		const query = 'SELECT * FROM weapons WHERE id=$1';

		const { rows: weapons } = await client.query(query, [id]);

		return weapons[0];
	},

	async getAllPlants() {
		const query = 'SELECT * FROM plants';

		const { rows: plants } = await client.query(query);

		return plants;
	},

	async getPlant(id) {
		const query = 'SELECT * FROM plants WHERE id=$1';

		const { rows: plants } = await client.query(query, [id]);

		return plants[0];
	},

	async getAllAnimals() {
		const query = 'SELECT * FROM animals';

		const { rows: animals } = await client.query(query);

		return animals;
	},

	async getAnimal(id) {
		const query = 'SELECT * FROM animals WHERE id=$1';

		const { rows: animals } = await client.query(query, [id]);

		return animals[0];
	},

	async getAllItems() {
		const query = 'SELECT * FROM items';

		const { rows: items } = await client.query(query);

		return items;
	},

	async queryItemsByCategory(category) {
		const query = 'SELECT * FROM items WHERE category=$1';

		const { rows: items } = await client.query(query, [category]);

		return items;
	},

	async getItem(id) {
		const query = 'SELECT * FROM items WHERE id=$1';

		const { rows: items } = await client.query(query, [id]);

		return items[0];
	}
};

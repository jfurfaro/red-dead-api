const { getAllAnimals, getAnimal } = require('../queries');

const typeDefs = /* GraphQL */`
	type Animal {
		id: ID!
		species: String!
		subspecies: [String!]!
	}
`;

class Node {
	constructor(data) {
		for (const k in data) {
			this[k] = data[k];
		}
	}

	get __typename() {
		return this.constructor.name;
	}
}

class Animal extends Node {
	get subspecies() {
		return this.subspeciesList;
	}

	set subspecies(value) {
		this.subspeciesList = value.split(',');
	}
}

const resolvers = {
	async animal(_, { id }) {
		return new Animal(await getAnimal(id));
	},

	async animals() {
		return (await getAllAnimals()).map(a => new Animal(a));
	}
};

module.exports = {
	typeDefs,
	resolvers
};

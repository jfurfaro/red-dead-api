const { getAllAnimals, getAnimal } = require('../queries'),
	{ GraphQLNonNull, GraphQLObjectType, GraphQLString, GraphQLID, GraphQLList } = require('graphql');

const animalType = new GraphQLObjectType({
	name: 'Animal',
	fields: {
		id: {type: new GraphQLNonNull(GraphQLID)},
		species: {type: new GraphQLNonNull(GraphQLString)},
		subspecies: {
			type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(GraphQLString))),
			resolve(obj) {
				return obj.subspecies.split(',');
			}
		}
	}
});

const animal = {
	type: animalType,
	args: {
		id: {type: new GraphQLNonNull(GraphQLID)}
	},
	async resolve(_, { id }) {
		return await getAnimal(id);
	}
};

const animals = {
	type: new GraphQLList(animalType),
	async resolve() {
		return await getAllAnimals();
	}
};

module.exports = {
	animal,
	animals
};

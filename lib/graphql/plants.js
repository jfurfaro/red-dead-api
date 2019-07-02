const { getAllPlants, getPlant } = require('../queries'),
	{ GraphQLNonNull, GraphQLObjectType, GraphQLString, GraphQLID, GraphQLList } = require('graphql');

const plantType = new GraphQLObjectType({
	name: 'Plant',
	fields: {
		id: {type: new GraphQLNonNull(GraphQLID)},
		name: {type: new GraphQLNonNull(GraphQLString)}
	}
});

const plants = {
	type: new GraphQLNonNull(new GraphQLList(plantType)),
	resolve: async () => await getAllPlants()
};

const plant = {
	type: plantType,
	args: {
		id: {type: new GraphQLNonNull(GraphQLID)}
	},
	resolve: async (_, { id }) => await getPlant(id)
};

module.exports = {
	plant,
	plants
};

const { getAllPlants, getPlant } = require('../queries');

const typeDefs = /* GraphQL */`
	type Plant {
		id: ID!
		name: String!
	}
`;

const resolvers = {
	async plants() {
		return await getAllPlants();
	},

	async plant(_, { id }) {
		return await getPlant(id);
	}
};

module.exports = {
	typeDefs,
	resolvers
};

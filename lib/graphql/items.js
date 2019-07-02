const { getAllItems, queryItemsByCategory, getItem } = require('../queries'),
	{ GraphQLNonNull, GraphQLObjectType, GraphQLString, GraphQLEnumType, GraphQLID, GraphQLList } = require('graphql');

const categoryEnum = new GraphQLEnumType({
	name: 'ItemCategory',
	values: {
		kit: {},
		tonics: {},
		provisions: {}
	}
});

const itemType = new GraphQLObjectType({
	name: 'Item',
	fields: {
		id: {type: new GraphQLNonNull(GraphQLID)},
		name: {type: new GraphQLNonNull(GraphQLString)},
		description: {type: GraphQLString},
		category: {type: categoryEnum}
	}
});

const items = {
	type: new GraphQLNonNull(new GraphQLList(itemType)),
	args: {
		category: {type: categoryEnum}
	},
	resolve: async (_, { category }) => await (category ? queryItemsByCategory(category) : getAllItems())
};

const item = {
	type: itemType,
	args: {
		id: {type: new GraphQLNonNull(GraphQLID)}
	},
	resolve: async (_, { id }) => await getItem(id)
};

module.exports = {
	item,
	items
};

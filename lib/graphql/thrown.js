const { queryWeaponsByType, getWeapon } = require('../queries'),
	{ weaponInterface } = require('./weaponInterface'),
	{ GraphQLNonNull, GraphQLObjectType, GraphQLFloat, GraphQLString, GraphQLID, GraphQLList } = require('graphql');

/* eslint-disable camelcase */
const thrownType = new GraphQLObjectType({
	name: 'Thrown',
	interfaces: [weaponInterface],
	fields: {
		id: {type: new GraphQLNonNull(GraphQLID)},
		name: {type: new GraphQLNonNull(GraphQLString)},
		description: {type: GraphQLString},
		damage: {type: new GraphQLNonNull(GraphQLFloat)},
		range: {type: new GraphQLNonNull(GraphQLFloat)}
	},
	isTypeOf: value => value.type === 'thrown'
});
/* eslint-enable */

const throwns = {
	type: new GraphQLNonNull(new GraphQLList(thrownType)),
	resolve: async () => await queryWeaponsByType('thrown')
};

const thrown = {
	type: thrownType,
	args: {
		id: {type: new GraphQLNonNull(GraphQLID)}
	},
	async resolve(_, { id }) {
		const weapon = await getWeapon(id);

		return weapon.type === 'thrown' ? weapon : null;
	}
};

module.exports = {
	thrown,
	throwns
};

const { queryWeaponsByType, getWeapon } = require('../queries'),
	{ weaponInterface } = require('./weaponInterface'),
	{ GraphQLNonNull, GraphQLObjectType, GraphQLFloat, GraphQLString, GraphQLID, GraphQLList } = require('graphql');

/* eslint-disable camelcase */
const meleeType = new GraphQLObjectType({
	name: 'Melee',
	interfaces: [weaponInterface],
	fields: {
		id: {type: new GraphQLNonNull(GraphQLID)},
		name: {type: new GraphQLNonNull(GraphQLString)},
		description: {type: GraphQLString},
		damage: {type: new GraphQLNonNull(GraphQLFloat)},
		range: {type: new GraphQLNonNull(GraphQLFloat)}
	},
	isTypeOf: value => value.type === 'melee'
});
/* eslint-enable */

const melees = {
	type: new GraphQLNonNull(new GraphQLList(meleeType)),
	resolve: async () => await queryWeaponsByType('melee')
};

const melee = {
	type: meleeType,
	args: {
		id: {type: new GraphQLNonNull(GraphQLID)}
	},
	async resolve(_, { id }) {
		const weapon = await getWeapon(id);

		return weapon.type === 'melee' ? weapon : null;
	}
};

module.exports = {
	melee,
	melees
};

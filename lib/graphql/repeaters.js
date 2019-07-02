const { queryWeaponsByType, getWeapon } = require('../queries'),
	{ weaponInterface } = require('./weaponInterface'),
	{ GraphQLNonNull, GraphQLObjectType, GraphQLFloat, GraphQLInt, GraphQLString, GraphQLID, GraphQLList } = require('graphql');

/* eslint-disable camelcase */
const repeaterType = new GraphQLObjectType({
	name: 'Repeater',
	interfaces: [weaponInterface],
	fields: {
		id: {type: new GraphQLNonNull(GraphQLID)},
		name: {type: new GraphQLNonNull(GraphQLString)},
		description: {type: GraphQLString},
		damage: {type: new GraphQLNonNull(GraphQLFloat)},
		range: {type: new GraphQLNonNull(GraphQLFloat)},
		fire_rate: {type: new GraphQLNonNull(GraphQLFloat)},
		accuracy: {type: new GraphQLNonNull(GraphQLFloat)},
		reload: {type: new GraphQLNonNull(GraphQLFloat)},
		max_ammo: {type: new GraphQLNonNull(GraphQLInt)},
		max_loaded: {type: new GraphQLNonNull(GraphQLInt)},
		total_shot: {
			type: new GraphQLNonNull(GraphQLInt),
			resolve: obj => obj.max_ammo + obj.max_loaded
		}
	},
	isTypeOf: value => value.type === 'repeater'
});
/* eslint-enable */

const repeaters = {
	type: new GraphQLNonNull(new GraphQLList(repeaterType)),
	resolve: async () => await queryWeaponsByType('repeater')
};

const repeater = {
	type: repeaterType,
	args: {
		id: {type: new GraphQLNonNull(GraphQLID)}
	},
	async resolve(_, { id }) {
		const weapon = await getWeapon(id);

		return weapon.type === 'repeater' ? weapon : null;
	}
};

module.exports = {
	repeater,
	repeaters
};

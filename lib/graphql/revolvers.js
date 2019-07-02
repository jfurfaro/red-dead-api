const { queryWeaponsByType, getWeapon } = require('../queries'),
	{ weaponInterface } = require('./weaponInterface'),
	{ GraphQLNonNull, GraphQLObjectType, GraphQLFloat, GraphQLInt, GraphQLString, GraphQLID, GraphQLList } = require('graphql');

/* eslint-disable camelcase */
const revolverType = new GraphQLObjectType({
	name: 'Revolver',
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
	isTypeOf: value => value.type === 'revolver'
});
/* eslint-enable */

const revolvers = {
	type: new GraphQLNonNull(new GraphQLList(revolverType)),
	resolve: async () => await queryWeaponsByType('revolver')
};

const revolver = {
	type: revolverType,
	args: {
		id: {type: new GraphQLNonNull(GraphQLID)}
	},
	async resolve(_, { id }) {
		const weapon = await getWeapon(id);

		return weapon.type === 'revolver' ? weapon : null;
	}
};

module.exports = {
	revolver,
	revolvers
};

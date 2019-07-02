const { queryWeaponsByType, getWeapon } = require('../queries'),
	{ weaponInterface } = require('./weaponInterface'),
	{ GraphQLNonNull, GraphQLObjectType, GraphQLFloat, GraphQLInt, GraphQLString, GraphQLID, GraphQLList } = require('graphql');

/* eslint-disable camelcase */
const rifleType = new GraphQLObjectType({
	name: 'Rifle',
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
	isTypeOf: value => value.type === 'rifle'
});
/* eslint-enable */

const rifles = {
	type: new GraphQLNonNull(new GraphQLList(rifleType)),
	resolve: async () => await queryWeaponsByType('rifle')
};

const rifle = {
	type: rifleType,
	args: {
		id: {type: new GraphQLNonNull(GraphQLID)}
	},
	async resolve(_, { id }) {
		const weapon = await getWeapon(id);

		return weapon.type === 'rifle' ? weapon : null;
	}
};

module.exports = {
	rifle,
	rifles
};

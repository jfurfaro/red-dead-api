const { getAllWeapons, getWeapon } = require('../queries'),
	{ GraphQLNonNull, GraphQLInterfaceType, GraphQLList, GraphQLString, GraphQLID, GraphQLFloat } = require('graphql');

const weaponInterface = new GraphQLInterfaceType({
	name: 'Weapon',
	fields: {
		id: {type: new GraphQLNonNull(GraphQLID)},
		name: {type: new GraphQLNonNull(GraphQLString)},
		description: {type: GraphQLString},
		damage: {type: new GraphQLNonNull(GraphQLFloat)},
		range: {type: new GraphQLNonNull(GraphQLFloat)}
	}
});

const weapons = {
	type: new GraphQLNonNull(new GraphQLList(weaponInterface)),
	async resolve() {
		return await getAllWeapons();
	}
};

const weapon = {
	type: weaponInterface,
	args: {
		id: {type: new GraphQLNonNull(GraphQLID)}
	},
	async resolve(_, { id }) {
		return await getWeapon(id);
	}
};

module.exports = {
	weaponInterface,
	weapon,
	weapons
};

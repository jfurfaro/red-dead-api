const { GraphQLObjectType, GraphQLSchema } = require('graphql'),
	{ weapon, weapons } = require('./weaponInterface'),
	{ melee, melees } = require('./melee'),
	{ thrown, throwns } = require('./thrown'),
	{ revolver, revolvers } = require('./revolvers'),
	{ pistol, pistols } = require('./pistols'),
	{ repeater, repeaters } = require('./repeaters'),
	{ shotgun, shotguns } = require('./shotguns'),
	{ rifle, rifles } = require('./rifles'),
	{ plant, plants } = require('./plants'),
	{ animal, animals } = require('./animals'),
	{ item, items } = require('./items');

const queryType = new GraphQLObjectType({
	type: 'Query',
	name: 'Query',
	fields: {
		plant,
		plants,
		animal,
		animals,
		item,
		items,
		weapon,
		weapons,
		melee,
		melees,
		thrown,
		throwns,
		revolver,
		revolvers,
		pistol,
		pistols,
		repeater,
		repeaters,
		shotgun,
		shotguns,
		rifle,
		rifles
	}
});

const schema = new GraphQLSchema({
	query: queryType
});

module.exports = {
	schema
};

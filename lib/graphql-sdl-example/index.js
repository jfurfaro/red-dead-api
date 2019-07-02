const { buildSchema } = require('graphql'),
	{ typeDefs: weaponTypeDefs, resolvers: weaponResolvers } = require('./weapons'),
	{ typeDefs: plantTypeDefs, resolvers: plantResolvers } = require('./plants'),
	{ typeDefs: animalTypeDefs, resolvers: animalResolvers } = require('./animals');

const queryDef = /* GraphQL */`
type Query {
	weapons: [Weapon!]!
	weapon(id: ID): Weapon
	melees: [Melee!]!
	melee(id: ID): Melee
	throwns: [Thrown!]!
	thrown(id: ID): Thrown
	revolvers: [Revolver!]!
	revolver(id: ID): Revolver
	pistols: [Pistol!]!
	pistol(id: ID): Pistol
	repeaters: [Repeater!]!
	repeater(id: ID): Repeater
	shotguns: [Shotgun!]!
	shotgun(id: ID): Shotgun
	rifles: [Rifle!]!
	rifle(id: ID): Rifle
	plants: [Plant!]!
	plant(id: ID): Plant
	animals: [Animal!]!
	animal(id: ID): Animal
}
`;

const schema = buildSchema([weaponTypeDefs, animalTypeDefs, plantTypeDefs, queryDef].join(''));

module.exports = {
	schema,
	rootValue: {
		...weaponResolvers,
		...animalResolvers,
		...plantResolvers
	}
};

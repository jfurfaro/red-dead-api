const { getAllWeapons, queryWeaponsByType, getWeapon } = require('../queries');

const typeDefs = /* GraphQL */`
interface Weapon {
	id: ID!
	name: String!
	slug: String!
	description: String
	damage: Float!
	range: Float!
}

type Melee implements Weapon {
	id: ID!
	name: String!
	slug: String!
	description: String
	damage: Float!
	range: Float!
}

type Thrown implements Weapon {
	id: ID!
	name: String!
	slug: String!
	description: String
	damage: Float!
	range: Float!
}

type Revolver implements Weapon {
	id: ID!
	name: String!
	slug: String!
	description: String
	fire_rate: Float
	damage: Float!
	accuracy: Float
	range: Float!
	reload: Float
	max_ammo: Int
	max_loaded: Int
}

type Pistol implements Weapon {
	id: ID!
	name: String!
	slug: String!
	description: String
	fire_rate: Float
	damage: Float!
	accuracy: Float
	range: Float!
	reload: Float
	max_ammo: Int
	max_loaded: Int
}

type Repeater implements Weapon {
	id: ID!
	name: String!
	slug: String!
	description: String
	fire_rate: Float
	damage: Float!
	accuracy: Float
	range: Float!
	reload: Float
	max_ammo: Int
	max_loaded: Int
}

type Shotgun implements Weapon {
	id: ID!
	name: String!
	slug: String!
	description: String
	fire_rate: Float
	damage: Float!
	accuracy: Float
	range: Float!
	reload: Float
	max_ammo: Int
	max_loaded: Int
}

type Rifle implements Weapon {
	id: ID!
	name: String!
	slug: String!
	description: String
	fire_rate: Float
	damage: Float!
	accuracy: Float
	range: Float!
	reload: Float
	max_ammo: Int
	max_loaded: Int
}
`;

class Weapon {
	constructor({id, name, slug, description, damage, range}) {
		this.id = id;
		this.name = name;
		this.slug = slug;
		this.description = description;
		this.damage = damage;
		this.range = range;
	}

	get __typename() {
		return this.constructor.name;
	}
}

class Melee extends Weapon {}
class Thrown extends Weapon {}

/* eslint-disable camelcase */
class Gun extends Weapon {
	constructor({fire_rate, max_ammo, max_loaded, reload, ...data}) {
		super(data);

		this.fire_rate = fire_rate;
		this.max_ammo = max_ammo;
		this.max_loaded = max_loaded;
		this.reload = reload;
	}

	total_shot() {
		return this.max_ammo + this.max_loaded;
	}
}
/* eslint-enable */

class Revolver extends Gun {}
class Pistol extends Gun {}
class Repeater extends Gun {}
class Shotgun extends Gun {}
class Rifle extends Gun {}

const classes = {
	melee: Melee,
	thrown: Thrown,
	revolver: Revolver,
	pistol: Pistol,
	repeater: Repeater,
	shotgun: Shotgun,
	rifle: Rifle
};

const resolvers = {
	async weapons() {
		return (await getAllWeapons()).map(({type, ...data}) => new classes[type](data));
	},

	async weapon({ id }) {
		const weapon = await getWeapon(id);
		return weapon && classes[weapon.type] && new classes[weapon.type](weapon);
	},

	...[
		'revolver',
		'pistol',
		'repeater',
		'shotgun',
		'rifle',
		'melee',
		'thrown'
	].reduce((funcs, type) => {
		funcs[type] = async ({ id }) => {
			const weapon = await getWeapon(id);
			return weapon && weapon.type === type ? new classes[type](weapon) : null;
		};

		funcs[type + 's'] = async () => {
			return (await queryWeaponsByType(type)).map(w => new classes[type](w));
		};

		return funcs;
	}, {})
};

module.exports = {
	typeDefs,
	resolvers
};

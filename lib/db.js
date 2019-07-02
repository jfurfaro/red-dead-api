const { Pool } = require('pg');

const client = new Pool({
	user: 'postgres',
	host: 'localhost',
	database: 'rdr',
	port: 5432
});

module.exports = {
	client
};

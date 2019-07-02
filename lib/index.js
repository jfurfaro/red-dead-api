const Koa = require('koa'),
	Router = require('koa-router'),
	graphqlHTTP = require('koa-graphql'),
	{ schema } = require('./graphql');

const app = new Koa(),
	router = new Router();

app.use(async (ctx, next) => {
	console.time('Request Time');
	await next();
	console.timeEnd('Request Time');
});

router.all('/graphql', graphqlHTTP({
	schema,
	graphiql: process.env.NODE_ENV !== 'production'
}));

app.use(router.routes()).use(router.allowedMethods());

app.listen(4000, () => console.log('App listening on port 4000'));

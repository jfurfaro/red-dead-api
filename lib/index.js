const Koa = require('koa'),
	Router = require('koa-router'),
	bodyParser = require('koa-bodyparser'),
	graphqlHTTP = require('koa-graphql'),
	Logger = require('./logger'),
	{ schema } = require('./graphql');

const app = new Koa(),
	router = new Router(),
	log = new Logger({
		name: 'Red Dead GraphQL API',
		level: process.env.LOG_LEVEL || 'debug',
		prettyPrint: process.env.NODE_ENV !== 'production'
	});

app.use(log.middleware());
app.use(bodyParser());

router.all('/graphql', graphqlHTTP({
	schema,
	graphiql: process.env.NODE_ENV !== 'production'
}));

app.use(router.routes()).use(router.allowedMethods());

/**
 * Catch all other requests
 */
app.use(ctx => ctx.throw(404));

/**
 * Global error handler
 * Errors should be thrown directly from middleware and controllers to be handled here
 */
app.on('error', (err, ctx) => {
	const { request, response } = ctx;

	response.status = err.status || response.status;

	if(err.status < 500) {
		ctx.log.warn({request, response, ctx}, `${request.method} ${request.originalUrl} ${response.status} - ${err.message}`);
	} else {
		ctx.log.error({request, response, ctx, err});
	}
});

app.listen(4000, () => log.info('App listening on port 4000'));

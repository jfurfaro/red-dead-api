const pino = require('pino'),
	{ v4: uuidV4 } = require('uuid');

function requestSerializer(request) {
	if(!request) return request;

	const reqObj =  {
		method: request.method,
		url: request.originalUrl,
		headers: request.headers,
		remoteAddress: request.ip
	};

	if(request.body) {
		reqObj.body = request.body;

		if(reqObj.body.query) {
			reqObj.body.query = reqObj.body.query.replace(/\s+/g, ' ');
		}
	}

	return reqObj;
}

function ctxSerializer(ctx) {
	if(!ctx) return ctx;

	const ctxObj = {};

	if(ctx.user) ctxObj.user = ctx.user;
	if(ctx.appId) ctxObj.appId = ctx.appId;

	return ctxObj;
}

function responseSerializer(response) {
	if(!response) return response;

	const resObj = {
		headers: response.headers,
		status: response.status,
		length: response.length
	};

	if(response.responseTime) resObj.responseTime = response.responseTime;

	return resObj;
}

function errSerializer(err) {
	return err;
}

const defaultPrettifier = ({ messageKey }) => {
	const chalk = require('chalk'),
		colorLevel = {
			[pino.levels.values.trace]: chalk.gray,
			[pino.levels.values.debug]: chalk.blue,
			[pino.levels.values.info]: chalk.green,
			[pino.levels.values.warn]: chalk.yellow,
			[pino.levels.values.error]: chalk.magenta,
			[pino.levels.values.fatal]: chalk.red
		};

	return data => {
		const { request, response, ctx, err, requestId } = data,
			prefix = `${(new Date(data.time)).toISOString()} ${data.name}:`,
			level = chalk.bold(`[${pino.levels.labels[data.level].toUpperCase()}]`);

		let logLine = `${level} ${data[messageKey]}`;

		if(request) {
			const { body } = request,
				{ responseTime = '', length = '' } = response || {};

			logLine = `${logLine} - ${responseTime && `${responseTime}ms `}${length && `${length / 1000}kb`}${body && Object.keys(body).length ? `\n  body: ${JSON.stringify(body)}` : ''}`;
		}

		if(ctx && Object.keys(ctx).length) {
			logLine = `${logLine}\n  ctx: ${JSON.stringify(ctx)}`;
		}

		if(requestId) {
			logLine = `${logLine}\n  requestId: ${requestId}`;
		}

		if(err) {
			const { name, message, stack } = err;
			logLine = `${logLine}\n${name}: ${message}\n\t${stack}`;
		}

		return `${prefix} ${colorLevel[data.level](logLine)}\n`;
	};
};

const logSymbol = Symbol('log');
class Logger {
	/**
	 * Creates a new Logger
	 * @param {String} [name] name of the logger
	 * @param {String} [level] minimum level of logs to actually log
	 */
	constructor({ name, level, prettyPrint, prettifier = defaultPrettifier, redact } = {}) {
		this[logSymbol] = pino({
			name,
			level,
			prettyPrint,
			prettifier: !!prettyPrint && prettifier,
			redact,
			serializers: {
				request: requestSerializer,
				response: responseSerializer,
				ctx: ctxSerializer,
				err: errSerializer
			}
		});
	}

	trace(...args) {
		this[logSymbol].trace(...args);
	}

	debug(...args) {
		this[logSymbol].debug(...args);
	}

	info(...args) {
		this[logSymbol].info(...args);
	}

	warn(...args) {
		this[logSymbol].warn(...args);
	}

	error(...args) {
		this[logSymbol].error(...args);
	}

	fatal(...args) {
		this[logSymbol].fatal(...args);
	}

	/**
	 * Returns middleware pertaining to the logger
	 */
	middleware() {
		return async (ctx, next) => {
			ctx.log = this[logSymbol].child({requestId: uuidV4()});

			// Hi-res time
			const start = process.hrtime();

			await next();

			const [ seconds, nanoseconds ] = process.hrtime(start),
				{ request, response } = ctx,
				msg = `${request.method} ${request.originalUrl} ${response.status}`;

			response.responseTime = seconds * 1e3 + nanoseconds * 1e-6;

			ctx.log.info({request, response, ctx}, msg);
		};
	}
}

module.exports = Logger;

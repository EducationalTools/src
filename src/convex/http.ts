import { httpRouter } from 'convex/server';
import { authComponent, createAuth } from './auth';
import { httpAction } from './_generated/server';

const http = httpRouter();

authComponent.registerRoutes(http, createAuth, { cors: { allowedOrigins: ['*'] } });

http.route({
	path: '/',
	method: 'GET',
	handler: httpAction(async (ctx, request) => {
		const referer = request.headers.get('Referer');
		return new Response(null, {
			status: 302,
			headers: new Headers({
				Location: referer || 'https://edutools.ingo.au'
			})
		});
	})
});

export default http;

import { httpRouter } from 'convex/server';
import { authComponent, createAuth } from './auth';
import { httpAction } from './_generated/server';

const http = httpRouter();

authComponent.registerRoutes(http, createAuth, { cors: { allowedOrigins: ['*'] } });

http.route({
	method: 'GET',
	path: '/auth',
	handler: httpAction(async (ctx, request) => {
		return new Response(JSON.stringify({ message: 'Hello, world!' }), {
			headers: { 'Content-Type': 'application/json' }
		});
	})
});

export default http;

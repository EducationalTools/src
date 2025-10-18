import { httpRouter } from 'convex/server';
import { authComponent, createAuth } from './auth';
import { httpAction } from './_generated/server';

const http = httpRouter();

authComponent.registerRoutes(http, createAuth, { cors: { allowedOrigins: ['*'] } });

http.route({
	method: 'GET',
	path: '/auth',
	handler: httpAction(async (ctx, request) => {
		const url = new URL(request.url);
		const queryParams = new URLSearchParams(url.search);
		const redirectUrl = queryParams.get('redirect');
		if (!redirectUrl) {
			throw new Error('Missing redirect parameter');
		}
		const redirectUrlObj = new URL(redirectUrl);
		const host = redirectUrlObj.hostname;
		const sanitizedHost = host.replace(/[^a-zA-Z0-9.-]/g, '');

		return new Response(
			`
${sanitizedHost}
`,
			{
				headers: { 'Content-Type': 'text/html' }
			}
		);
	})
});

export default http;

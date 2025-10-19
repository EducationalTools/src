import { httpRouter } from 'convex/server';
import { authComponent, createAuth } from './auth';
import { httpAction } from './_generated/server';
import { generateAuthPage, generateErrorPage } from './html';
import validator from 'validator';

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
			return new Response(generateErrorPage('Missing redirect parameter'), {
				headers: { 'Content-Type': 'text/html' }
			});
		}
		const redirectUrlObj = new URL(redirectUrl);
		const redirectHost = redirectUrlObj.host;
		const sanitizedRedirectHost = validator.escape(redirectHost);

		if (redirectUrlObj.toString().startsWith('javascript:')) {
			return new Response(generateErrorPage('no'), {
				headers: { 'Content-Type': 'text/html' }
			});
		}

		const { auth, headers } = await authComponent.getAuth(createAuth, ctx);

		const session = await auth.api.getSession({ headers: request.headers });

		const token = await auth.api.generateOneTimeToken({ headers: request.headers });

		return new Response(
			generateAuthPage(
				sanitizedRedirectHost,
				validator.escape(session?.user.name || session?.user.email || ''),
				validator.escape(redirectUrlObj.toString()),
				`${redirectUrlObj.protocol == 'https' ? 'https' : 'http'}://${sanitizedRedirectHost}/ott?token=${token.token}&redirect=${encodeURIComponent(redirectUrl)}`,
				true
			),
			{
				headers: { 'Content-Type': 'text/html' }
			}
		);
	})
});

export default http;

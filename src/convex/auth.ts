import { createClient, type GenericCtx } from '@convex-dev/better-auth';
import { convex, crossDomain } from '@convex-dev/better-auth/plugins';
import { components } from './_generated/api';
import { type DataModel } from './_generated/dataModel';
import { query } from './_generated/server';
import { betterAuth } from 'better-auth';
import { createAuthMiddleware, genericOAuth, oAuthProxy } from 'better-auth/plugins';
import { oneTimeToken } from '../lib/auth/ott';

const siteUrl = process.env.PUBLIC_CONVEX_SITE_URL!; // redirects to the convex deployment, which redirects to the referer. if it works don't touch it

// The component client has methods needed for integrating Convex with Better Auth,
// as well as helper methods for general use.
export const authComponent = createClient<DataModel>(components.betterAuth);

export const createAuth = (
	ctx: GenericCtx<DataModel>,
	{ optionsOnly } = { optionsOnly: false }
) => {
	return betterAuth({
		// disable logging when createAuth is called just to generate options.
		// this is not required, but there's a lot of noise in logs without it.
		logger: {
			disabled: optionsOnly
		},
		trustedOrigins: ['*'], // security? fuck that
		baseURL: siteUrl,
		database: authComponent.adapter(ctx),
		socialProviders: {
			github: {
				clientId: process.env.GITHUB_CLIENT_ID as string,
				clientSecret: process.env.GITHUB_CLIENT_SECRET as string
			}
		},
		plugins: [
			// The Convex plugin is required for Convex compatibility
			convex(),

			oneTimeToken(),

			genericOAuth({
				config: [
					{
						providerId: 'username-password',
						clientId: 'gYMYrelgdysRVxiTLAHzknSz0XappYYI',
						clientSecret: 'VyduGcPTCQPnvya3sDqE8GUw60jgSosa7Gxht5R3gACclDR0Jz41tZwfGRzwm0lo',
						discoveryUrl: 'https://educationaltools.au.auth0.com/.well-known/openid-configuration'
					}
				]
			}),

			// Disable state check
			// refer to comment on line 26
			{
				id: 'disable-state-check',
				hooks: {
					before: [
						{
							matcher() {
								return true;
							},
							handler: createAuthMiddleware(async (ctx) => {
								return {
									context: {
										context: {
											oauthConfig: {
												skipStateCookieCheck: true
											}
										}
									}
								};
							})
						}
					]
				}
			}
		],
		advanced: {
			defaultCookieAttributes: {
				sameSite: 'none',
				secure: true,
				partitioned: true // New browser standards will mandate this for foreign cookies
			}
		}
	});
};

// Example function for getting the current user
// Feel free to edit, omit, etc.
export const getCurrentUser = query({
	args: {},
	handler: async (ctx) => {
		return authComponent.getAuthUser(ctx);
	}
});

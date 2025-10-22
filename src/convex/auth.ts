import { AuthFunctions, createClient, type GenericCtx } from '@convex-dev/better-auth';
import { convex } from '@convex-dev/better-auth/plugins';
import { components, internal } from './_generated/api';
import { type DataModel } from './_generated/dataModel';
import { query } from './_generated/server';
import { betterAuth } from 'better-auth';
import { createAuthMiddleware } from 'better-auth/plugins';
import { oneTimeToken } from '../lib/auth/ott';

const siteUrl = process.env.PUBLIC_CONVEX_SITE_URL!; // redirects to the convex deployment, which redirects to the referer. if it works don't touch it
const authFunctions: AuthFunctions = internal.auth;

// The component client has methods needed for integrating Convex with Better Auth,
// as well as helper methods for general use.
export const authComponent = createClient<DataModel>(components.betterAuth, {
	authFunctions,
	triggers: {
		user: {
			onCreate: async (ctx, doc) => {
				const user = await ctx.db
					.query('profiles')
					.withIndex('by_user', (q) => q.eq('userId', doc._id))
					.first();

				if (!user) {
					await ctx.db.insert('profiles', {
						userId: doc._id,
						name: doc.name
					});
				}
			},
			onUpdate: async (ctx, doc) => {
				const user = await ctx.db
					.query('profiles')
					.withIndex('by_user', (q) => q.eq('userId', doc._id))
					.first();

				if (!user) {
					await ctx.db.insert('profiles', {
						userId: doc._id,
						name: doc.name
					});
				}
			},
			onDelete: async (ctx, doc) => {
				const user = await ctx.db
					.query('profiles')
					.withIndex('by_user', (q) => q.eq('userId', doc._id))
					.first();

				if (!user) return;

				await ctx.db.delete(user._id);
			}
		}
	}
});

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
		emailAndPassword: { enabled: false },
		trustedOrigins: ['*'], // security? fuck that
		baseURL: siteUrl,
		database: authComponent.adapter(ctx),
		socialProviders: {
			github: {
				clientId: process.env.GITHUB_CLIENT_ID as string,
				clientSecret: process.env.GITHUB_CLIENT_SECRET as string
			},
			google: {
				clientId: process.env.GOOGLE_CLIENT_ID as string,
				clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
			}
		},
		plugins: [
			// The Convex plugin is required for Convex compatibility
			convex(),

			oneTimeToken(),

			// Disable state check
			// refer to comment on line 54
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

export const { onCreate, onUpdate, onDelete } = authComponent.triggersApi();

// Example function for getting the current user
// Feel free to edit, omit, etc.
export const getCurrentUser = query({
	args: {},
	handler: async (ctx) => {
		return authComponent.getAuthUser(ctx);
	}
});

import { v } from 'convex/values';
import { mutation, query } from './_generated/server';
import { authComponent, createAuth } from './auth';

export const getCurrent = query({
	args: {},
	handler: async (ctx) => {
		const currentUser = await authComponent.getAuthUser(ctx);

		const profile = await ctx.db
			.query('profiles')
			.withIndex('by_user', (q) => q.eq('userId', currentUser._id))
			.first();

		if (!profile) {
			throw new Error('Profile not found');
		}
		let pictureUrl;
		if (profile.picture) {
			pictureUrl = await ctx.storage.getUrl(profile.picture);
		} else {
			pictureUrl = null;
		}

		return {
			picture: pictureUrl,
			name: profile.name,
			bio: profile.bio,
			pronouns: profile.pronouns
		};
	}
});

export const updateCurrent = mutation({
	args: {
		name: v.string(),
		bio: v.string(),
		pronouns: v.string()
	},
	handler: async (ctx, { name, bio, pronouns }) => {
		const currentUser = await authComponent.getAuthUser(ctx);

		const profile = await ctx.db
			.query('profiles')
			.withIndex('by_user', (q) => q.eq('userId', currentUser._id))
			.first();

		if (!profile) {
			throw new Error('Profile not found');
		}

		await ctx.db.patch(profile._id, {
			name,
			bio,
			pronouns
		});
	}
});

export const get = query({
	args: { userId: v.string() },
	handler: async (ctx, { userId }) => {
		const profile = await ctx.db
			.query('profiles')
			.withIndex('by_user', (q) => q.eq('userId', userId))
			.first();

		if (!profile) {
			throw new Error('Profile not found');
		}

		let pictureUrl;
		if (profile.picture) {
			pictureUrl = await ctx.storage.getUrl(profile.picture);
		} else {
			pictureUrl = null;
		}

		return {
			picture: pictureUrl,
			name: profile.name,
			bio: profile.bio,
			pronouns: profile.pronouns
		};
	}
});

export const generateUploadUrl = mutation({
	handler: async (ctx) => {
		return await ctx.storage.generateUploadUrl();
	}
});

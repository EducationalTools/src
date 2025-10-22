import { v } from 'convex/values';
import { internalAction, internalMutation } from './_generated/server';
import { Id } from './_generated/dataModel';
import { internal } from './_generated/api';

export const setFromUrl = internalAction({
	args: {
		url: v.string(),
		userId: v.string()
	},
	handler: async (ctx, args) => {
		const response = await fetch(args.url);
		const image = await response.blob();

		const storageId: Id<'_storage'> = await ctx.storage.store(image);

		await ctx.runMutation(internal.profilepicture.internalSet, {
			storageId,
			userId: args.userId
		});
	}
});

export const internalSet = internalMutation({
	args: {
		storageId: v.id('_storage'),
		userId: v.string()
	},
	handler: async (ctx, args) => {
		const user = await ctx.db
			.query('profiles')
			.withIndex('by_user', (q) => q.eq('userId', args.userId))
			.first();

		if (!user) return;

		ctx.db.patch(user._id, { picture: args.storageId });
	}
});

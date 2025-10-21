import { query } from './_generated/server';
import { authComponent } from './auth';

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

		return profile;
	}
});

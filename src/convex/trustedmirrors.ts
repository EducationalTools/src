import { v } from 'convex/values';
import { internalQuery } from './_generated/server';

export const isTrusted = internalQuery({
	args: {
		host: v.string()
	},
	handler: async (ctx, args) => {
		const entry = await ctx.db
			.query('trustedMirrors')
			.withIndex('by_host', (q) => q.eq('host', args.host))
			.first();

		return !!entry;
	}
});

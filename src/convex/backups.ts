import { v } from 'convex/values';
import { query } from './_generated/server';

export const get = query({
	args: {
		id: v.string()
	},
	handler: async (ctx, args) => {
		const backups = await ctx.db
			.query('backup')
			.filter((q) => q.eq(q.field('user'), args.id))
			.take(100);
		return backups.map((backup) => backup.name);
	}
});

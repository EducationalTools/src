import { v } from 'convex/values';
import { query } from './_generated/server';
import * as jose from 'jose';

export const get = query({
	args: {
		jwt: v.string()
	},
	handler: async (ctx, args) => {
		if (!process.env.CLERK_JWT_KEY) {
			throw new Error('Missing CLERK_JWT_KEY environment variable');
		}
		const publicKey = await jose.importSPKI(process.env.CLERK_JWT_KEY, 'RS256');
		if (!publicKey) {
			throw new Error('Missing CLERK_JWT_KEY environment variable');
		}
		if (args.jwt.length === 0) {
			return [];
		}
		const { payload, protectedHeader } = await jose.jwtVerify(args.jwt, publicKey, {});
		const backups = await ctx.db
			.query('backup')
			.filter((q) => q.eq(q.field('user'), payload.sub))
			.take(100);
		return backups.map((backup) => ({
			name: backup.name,
			data: backup.data,
			creationTime: backup._creationTime
		}));
	}
});

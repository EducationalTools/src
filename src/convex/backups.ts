import { v } from 'convex/values';
import { mutation, query } from './_generated/server';
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
			.order('desc')
			.filter((q) => q.eq(q.field('user'), payload.sub))
			.take(100);
		return backups.map((backup) => ({
			name: backup.name,
			data: backup.data,
			creationTime: backup._creationTime,
			id: backup._id
		}));
	}
});

export const create = mutation({
	args: {
		jwt: v.string(),
		name: v.string()
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
			throw new Error('Missing JWT');
		}
		const { payload, protectedHeader } = await jose.jwtVerify(args.jwt, publicKey, {});
		if (!payload.sub) {
			throw new Error('Invalid JWT');
		}
		const backup = await ctx.db.insert('backup', {
			user: payload.sub,
			name: args.name,
			data: ''
		});
	}
});

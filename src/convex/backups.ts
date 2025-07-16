import { v } from 'convex/values';
import { mutation, query } from './_generated/server';
import * as jose from 'jose';

// Shared helper function to verify JWT and return payload
async function verifyJwtAndGetPayload(jwt: string) {
	if (!process.env.CLERK_JWT_KEY) {
		throw new Error('Missing CLERK_JWT_KEY environment variable');
	}
	const publicKey = await jose.importSPKI(process.env.CLERK_JWT_KEY, 'RS256');
	if (jwt.length === 0) {
		throw new Error('Missing JWT');
	}
	const { payload } = await jose.jwtVerify(jwt, publicKey, {});
	if (!payload.sub) {
		throw new Error('Invalid JWT');
	}
	return payload;
}

export const get = query({
	args: {
		jwt: v.string()
	},
	handler: async (ctx, args) => {
		const payload = await verifyJwtAndGetPayload(args.jwt);
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
		name: v.string(),
		data: v.string()
	},
	handler: async (ctx, args) => {
		const payload = await verifyJwtAndGetPayload(args.jwt);
		if (!payload.sub) {
			throw new Error('Invalid JWT: missing subject');
		}
		await ctx.db.insert('backup', {
			user: payload.sub,
			name: args.name,
			data: args.data
		});
	}
});

export const remove = mutation({
	args: {
		jwt: v.string(),
		id: v.id('backup')
	},
	handler: async (ctx, args) => {
		const payload = await verifyJwtAndGetPayload(args.jwt);
		const backup = await ctx.db.get(args.id);
		if (backup?.user !== payload.sub) {
			throw new Error('Unauthorized');
		}
		await ctx.db.delete(args.id);
	}
});

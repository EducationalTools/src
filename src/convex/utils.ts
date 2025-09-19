import * as jose from 'jose';
import type { MutationCtx } from './_generated/server';
import type { JWTPayload } from './types';

// Shared helper function to verify JWT and return payload
export async function verifyJwtAndGetPayload(jwt: string) {
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

export async function getAndUpdateUser(ctx: MutationCtx, payload: JWTPayload) {
	let user = await ctx.db
		.query('users')
		.withIndex('clerkid', (q) => q.eq('clerkId', payload.sub))
		.first();
	if (user) {
		await ctx.db.patch(user._id, {
			avatar: payload.avatar,
			email: payload.email,
			firstName: payload.firstname,
			lastName: payload.firstname,
			username: payload.username,
			verified: payload.verified,
			clerkId: payload.sub
		});
		user = await ctx.db.get(user._id);
	} else {
		const userId = await ctx.db.insert('users', {
			avatar: payload.avatar,
			email: payload.email,
			firstName: payload.firstname,
			lastName: payload.firstname,
			username: payload.username,
			verified: payload.verified,
			clerkId: payload.sub
		});
		user = await ctx.db.get(userId);
	}
	return user;
}

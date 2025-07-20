import { v } from 'convex/values';
import { mutation, query } from './_generated/server';
import * as jose from 'jose';

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

export const bugReport = mutation({
	args: {
		jwt: v.string(),
		briefDescription: v.string(),
		description: v.string(),
		reproduction: v.string(),
		expected: v.string(),
		log: v.string(),
		additional: v.string(),
		distinctId: v.string(),
		userAgent: v.string()
	},
	handler: async (ctx, args) => {
		const payload = await verifyJwtAndGetPayload(args.jwt);
		// return success=false if not everything is filled out
		if (!args.briefDescription || !args.description || !args.reproduction || !args.expected) {
			return { success: false, message: 'Missing required fields' };
		}
		return { success: true, message: 'Bug report submitted successfully' };
	}
});

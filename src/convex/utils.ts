import * as jose from 'jose';

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

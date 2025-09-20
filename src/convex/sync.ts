import { v } from 'convex/values';
import { query } from './_generated/server';
import { getUser, verifyJwtAndGetPayload } from './utils';

export const get = query({
	args: {
		jwt: v.string()
	},
	handler: async (ctx, args) => {
		const payload = await verifyJwtAndGetPayload(args.jwt);
		const userInfo = await getUser(ctx, payload);
		if (!userInfo) {
			return null;
		}
		return {
			settings: userInfo.settings,
			favourites: userInfo.favourites,
			history: userInfo.history
		};
	}
});

// import { v } from 'convex/values';
// import { mutation, query } from './_generated/server';
// import { getAndUpdateUser, getUser, verifyJwtAndGetPayload } from './utils';

// export const get = query({
// 	args: {
// 		jwt: v.string()
// 	},
// 	handler: async (ctx, args) => {
// 		const payload = await verifyJwtAndGetPayload(args.jwt);
// 		const userInfo = await getUser(ctx, payload);
// 		if (!userInfo) {
// 			return null;
// 		}
// 		return {
// 			settings: userInfo.settings,
// 			favourites: userInfo.favourites,
// 			history: userInfo.history
// 		};
// 	}
// });

// export const update = mutation({
// 	args: {
// 		jwt: v.string(),
// 		settings: v.optional(
// 			v.object({
// 				experimentalFeatures: v.boolean(),
// 				open: v.string(),
// 				theme: v.string(),
// 				panic: v.object({
// 					enabled: v.boolean(),
// 					key: v.string(),
// 					url: v.string(),
// 					disableExperimentalMode: v.boolean()
// 				}),
// 				cloak: v.object({
// 					mode: v.string(),
// 					name: v.string(),
// 					icon: v.string()
// 				}),
// 				history: v.boolean()
// 			})
// 		),
// 		favourites: v.optional(v.array(v.string())),
// 		history: v.optional(v.array(v.string()))
// 	},
// 	handler: async (ctx, args) => {
// 		const payload = await verifyJwtAndGetPayload(args.jwt);
// 		if (!payload.sub) {
// 			throw new Error('Invalid JWT: missing subject');
// 		}
// 		const userInfo = await getAndUpdateUser(ctx, payload);
// 		if (!userInfo?._id) {
// 			throw new Error('Something went wrong');
// 		}

// 		if (args.favourites) {
// 			await ctx.db.patch(userInfo._id, {
// 				favourites: args.favourites
// 			});
// 		}
// 		if (args.history) {
// 			await ctx.db.patch(userInfo._id, {
// 				history: args.history
// 			});
// 		}
// 		if (args.settings) {
// 			await ctx.db.patch(userInfo._id, {
// 				settings: args.settings
// 			});
// 		}
// 	}
// });

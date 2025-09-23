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
// 			return [];
// 		}
// 		const backups = await ctx.db
// 			.query('backup')
// 			.order('desc')
// 			.filter((q) => q.eq(q.field('user'), userInfo._id))
// 			.collect();
// 		return backups.map((backup) => ({
// 			name: backup.name,
// 			data: backup.data,
// 			creationTime: backup._creationTime,
// 			id: backup._id
// 		}));
// 	}
// });

// export const create = mutation({
// 	args: {
// 		jwt: v.string(),
// 		name: v.string(),
// 		data: v.string()
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
// 		await ctx.db.insert('backup', {
// 			user: userInfo?._id,
// 			name: args.name,
// 			data: args.data
// 		});
// 	}
// });

// export const remove = mutation({
// 	args: {
// 		jwt: v.string(),
// 		id: v.id('backup')
// 	},
// 	handler: async (ctx, args) => {
// 		const payload = await verifyJwtAndGetPayload(args.jwt);
// 		const backup = await ctx.db.get(args.id);
// 		const userInfo = await getAndUpdateUser(ctx, payload);

// 		if (backup?.user !== userInfo?._id) {
// 			throw new Error('Unauthorized');
// 		}
// 		await getAndUpdateUser(ctx, payload);
// 		await ctx.db.delete(args.id);
// 	}
// });

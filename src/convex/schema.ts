import { defineSchema, defineTable } from 'convex/server';
import { v } from 'convex/values';

export default defineSchema({
	comments: defineTable({
		body: v.string(),
		gmaeid: v.string(),
		user: v.id('users')
	}),
	backup: defineTable({
		name: v.string(),
		data: v.string(),
		user: v.id('users')
	}),
	users: defineTable({
		email: v.string(),
		firstName: v.string(),
		lastName: v.string(),
		avatar: v.string(),
		username: v.string(),
		verified: v.boolean(),
		clerkId: v.string()
	}).index('clerkid', ['clerkId'])
});

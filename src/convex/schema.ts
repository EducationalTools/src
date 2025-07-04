import { defineSchema, defineTable } from 'convex/server';
import { v } from 'convex/values';

export default defineSchema({
	comments: defineTable({
		body: v.string(),
		gmaeid: v.string(),
		user: v.string()
	}),
	backup: defineTable({
		name: v.string(),
		data: v.string()
	})
});

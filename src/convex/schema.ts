import { defineSchema, defineTable } from 'convex/server';
import { v } from 'convex/values';

export default defineSchema({
	trustedMirrors: defineTable({
		host: v.string()
	}).index('by_host', ['host']),
	profiles: defineTable({
		userId: v.string(),
		name: v.optional(v.string()),
		picture: v.optional(v.id('_storage')),
		bio: v.optional(v.string()),
		pronouns: v.optional(v.string())
	}).index('by_user', ['userId'])
});

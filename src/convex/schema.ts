import { defineSchema, defineTable } from 'convex/server';
import { v } from 'convex/values';

export default defineSchema({
	trustedMirrors: defineTable({
		host: v.string()
	})
});

import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  trustedMirrors: defineTable({
    host: v.string(),
  }).index("by_host", ["host"]),
  profiles: defineTable({
    userId: v.string(),
    badges: v.optional(v.array(v.string())),
  }).index("by_user", ["userId"]),

  backups: defineTable({
    data: v.string(),
    version: v.number(),
    userId: v.string(),
  }).index("by_user", ["userId"]),
});

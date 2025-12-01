import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  trustedMirrors: defineTable({
    host: v.string(),
  }).index("by_host", ["host"]),

  backups: defineTable({
    data: v.string(),
    version: v.number(),
    userId: v.string(),
    name: v.string(),
    backupKey: v.string(),
  }).index("by_user", ["userId"]),
});

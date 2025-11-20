import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { authComponent } from "./auth";

export const createBackup = mutation({
  args: {
    data: v.string(),
  },

  handler: async (ctx, args) => {
    const { data } = args;
    const user = await authComponent.safeGetAuthUser(ctx);

    if (!user || !user._id) {
      throw new Error("Unauthorized");
    }

    const backup = await ctx.db
      .insert("backups", {
        data,
        version: 1,
        userId: user._id,
      })
      .catch((error) => {
        console.error("Failed to create backup:", error);
        throw new Error("Failed to create backup");
      });

    return backup;
  },
});

export const getBackups = query({
  handler: async (ctx) => {
    const user = await authComponent.safeGetAuthUser(ctx);
    if (!user || !user._id) {
      throw new Error("Unauthorized");
    }

    const backups = await ctx.db
      .query("backups")
      .withIndex("by_user", (q) => q.eq("userId", user._id))
      .collect();
    return backups;
  },
});

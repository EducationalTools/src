import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { authComponent } from "./auth";

export const createBackup = mutation({
  args: {
    data: v.string(),
    name: v.string(),
  },

  handler: async (ctx, args) => {
    const { data, name } = args;
    const user = await authComponent.safeGetAuthUser(ctx);

    if (!user || !user._id) {
      return { success: false, error: "Unauthorized" };
    }

    const backup = await ctx.db
      .insert("backups", {
        data,
        version: 1,
        userId: user._id,
        name,
      })
      .catch((error) => {
        console.error("Failed to create backup:", error);
        throw new Error("Failed to create backup");
      });

    return { success: true, backupId: backup };
  },
});

export const getBackups = query({
  handler: async (ctx) => {
    const user = await authComponent.safeGetAuthUser(ctx);
    if (!user || !user._id) {
      return { success: false, error: "Unauthorized" };
    }

    const backups = await ctx.db
      .query("backups")
      .withIndex("by_user", (q) => q.eq("userId", user._id))
      .collect();
    return { success: true, backups: backups };
  },
});

export const deleteBackup = mutation({
  args: {
    id: v.id("backups"),
  },
  handler: async (ctx, args) => {
    const { id } = args;
    const user = await authComponent.safeGetAuthUser(ctx);

    if (!user || !user._id) {
      return { success: false, error: "Unauthorized" };
    }

    const backup = await ctx.db.get(id);
    if (!backup || backup.userId !== user._id) {
      return { success: false, error: "Unauthorized" };
    }

    try {
      await ctx.db.delete(id);
      return { success: true };
    } catch (error) {
      console.error("Failed to delete backup:", error);
      return { success: false, error: "Failed to delete backup" };
    }
  },
});

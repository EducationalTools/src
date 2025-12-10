import {
  AuthFunctions,
  createClient,
  type GenericCtx,
} from "@convex-dev/better-auth";
import { convex, crossDomain } from "@convex-dev/better-auth/plugins";
import { components, internal } from "./_generated/api";
import { DataModel } from "./_generated/dataModel";
import { query } from "./_generated/server";
import { betterAuth } from "better-auth";
import { admin, createAuthMiddleware } from "better-auth/plugins";
import { oneTimeToken } from "../lib/auth/ott";
import authSchema from "./betterAuth/schema";

const siteUrl = process.env.PUBLIC_CONVEX_SITE_URL!; // redirects to the convex deployment, which redirects to the referer. if it works don't touch it

const authFunctions: AuthFunctions = internal.auth;

// The component client has methods needed for integrating Convex with Better Auth,
// as well as helper methods for general use.
export const authComponent = createClient<DataModel, typeof authSchema>(
  components.betterAuth,
  {
    local: {
      schema: authSchema,
    },
    authFunctions,
    triggers: {
      user: {
        onDelete: async (ctx, doc) => {
          if (!doc?.userId) {
            return;
          }

          const backups = await ctx.db
            .query("backups")
            .withIndex("by_user", (q) => q.eq("userId", doc.userId as string))
            .collect();
          for (const backup of backups) {
            await ctx.db.delete(backup._id);
          }
        },
      },
    },
  }
);

export const createAuth = (
  ctx: GenericCtx<DataModel>,
  { optionsOnly } = { optionsOnly: false }
) => {
  return betterAuth({
    logger: {
      disabled: optionsOnly,
    },
    baseURL: siteUrl,
    trustedOrigins: ["*"], // security? fuck that
    database: authComponent.adapter(ctx),
    emailAndPassword: { enabled: false },
    plugins: [
      convex(),
      oneTimeToken(),
      admin(),
      // Disable state check, see line 33
      {
        id: "disable-state-check",
        hooks: {
          before: [
            {
              matcher() {
                return true;
              },
              handler: createAuthMiddleware(async (ctx) => {
                return {
                  context: {
                    context: {
                      oauthConfig: {
                        skipStateCookieCheck: true,
                      },
                    },
                  },
                };
              }),
            },
          ],
        },
      },
    ],
    socialProviders: {
      github: {
        clientId: process.env.GITHUB_CLIENT_ID as string,
        clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
      },
      google: {
        clientId: process.env.GOOGLE_CLIENT_ID as string,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      },
      discord: {
        clientId: process.env.DISCORD_CLIENT_ID as string,
        clientSecret: process.env.DISCORD_CLIENT_SECRET as string,
      },
    },
    advanced: {
      defaultCookieAttributes: {
        sameSite: "none",
        secure: true,
        partitioned: true, // New browser standards will mandate this for foreign cookies
      },
    },
    user: {
      deleteUser: {
        enabled: true,
      },
    },
    account: {
      accountLinking: {
        enabled: true,
        allowDifferentEmails: true,
      },
    },
    rateLimit: {
      window: 10,
      max: 100,
      enabled: true,
      storage: "database",
    },
  });
};

// Example function for getting the current user
// Feel free to edit, omit, etc.
export const getCurrentUser = query({
  args: {},
  handler: async (ctx) => {
    return authComponent.safeGetAuthUser(ctx);
  },
});

export const { onCreate, onDelete, onUpdate } = authComponent.triggersApi();

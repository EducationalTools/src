import {
  createClient,
  type GenericCtx,
  type AuthFunctions,
} from "@convex-dev/better-auth";
import { convex, crossDomain } from "@convex-dev/better-auth/plugins";
import { components, internal } from "./_generated/api";
import { DataModel } from "./_generated/dataModel";
import { query } from "./_generated/server";
import { betterAuth, type BetterAuthOptions } from "better-auth/minimal";
import authConfig from "./auth.config";
import { admin, createAuthMiddleware, oneTimeToken } from "better-auth/plugins";
import authSchema from "./betterAuth/schema";

const siteUrl = process.env.PUBLIC_CONVEX_SITE_URL!;

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
  },
);

export const createAuthOptions = (ctx: GenericCtx<DataModel>) => {
  return {
    database: authComponent.adapter(ctx),
    baseURL: siteUrl,
    trustedOrigins: ["*"], // security? fuck that
    emailAndPassword: { enabled: false },
    plugins: [
      convex({ authConfig }),
      oneTimeToken(),
      admin(),
      // Disable state check, see line 52
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
  } satisfies BetterAuthOptions;
};

export const createAuth = (ctx: GenericCtx<DataModel>) => {
  return betterAuth(createAuthOptions(ctx));
};

// Example function for getting the current user
// Feel free to edit, omit, etc.
export const getCurrentUser = query({
  args: {},
  handler: async (ctx) => {
    return authComponent.safeGetAuthUser(ctx);
  },
});

export const { onCreate, onUpdate, onDelete } = authComponent.triggersApi();

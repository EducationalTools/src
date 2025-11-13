import { createAuthClient } from "better-auth/react";
import { convexClient } from "@convex-dev/better-auth/client/plugins";
import { oneTimeTokenClient } from "@/lib/auth/ott/client";

export const authClient = createAuthClient({
  baseURL: import.meta.env.VITE_CONVEX_SITE_URL,
  plugins: [convexClient(), oneTimeTokenClient()],
});

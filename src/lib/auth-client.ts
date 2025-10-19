import { createAuthClient } from 'better-auth/svelte';
import { convexClient, crossDomainClient } from '@convex-dev/better-auth/client/plugins';
import { oneTimeTokenClient } from '$lib/auth/ott/client';

export const authClient = createAuthClient({
	plugins: [convexClient(), oneTimeTokenClient()],
	baseURL: process.env.PUBLIC_CONVEX_SITE_URL
});

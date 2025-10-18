import { createAuthClient } from 'better-auth/svelte';
import { convexClient, crossDomainClient } from '@convex-dev/better-auth/client/plugins';
import { oneTimeTokenClient } from 'better-auth/client/plugins';

export const authClient = createAuthClient({
	plugins: [convexClient(), oneTimeTokenClient()],
	baseURL: 'https://rightful-dogfish-709.convex.site'
});

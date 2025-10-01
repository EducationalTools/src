import { createAuthClient } from 'better-auth/svelte';
import { convexClient, crossDomainClient } from '@convex-dev/better-auth/client/plugins';

export const authClient = createAuthClient({
	plugins: [convexClient(), crossDomainClient()],
	baseURL: 'https://rightful-dogfish-709.convex.site'
});

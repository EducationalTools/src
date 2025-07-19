<script lang="ts">
	import { ClerkProvider, GoogleOneTap } from 'svelte-clerk/client';
	import { ModeWatcher } from 'mode-watcher';
	import { setupConvex } from 'convex-svelte';
	import { PUBLIC_CLERK_PUBLISHABLE_KEY, PUBLIC_CONVEX_URL } from '$env/static/public';

	// Props
	let { children } = $props();

	// Setup Convex
	setupConvex(PUBLIC_CONVEX_URL);
</script>

<ClerkProvider publishableKey={PUBLIC_CLERK_PUBLISHABLE_KEY}>
	<GoogleOneTap />
	<ModeWatcher disableTransitions={false} defaultMode={'dark'} />
	{@render children()}
</ClerkProvider>

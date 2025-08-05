<script lang="ts">
	import { ClerkProvider, GoogleOneTap } from 'svelte-clerk/client';
	import { ModeWatcher } from 'mode-watcher';
	import { setupConvex } from 'convex-svelte';

	// Props
	let { children } = $props();

	// Setup Convex
	try {
		setupConvex(process.env.PUBLIC_CONVEX_URL || '');
	}
	catch {
		console.log("failed to setup convex, most likely a devbuild");
	}
</script>

<ClerkProvider publishableKey={process.env.PUBLIC_CLERK_PUBLISHABLE_KEY || ''}>
	<GoogleOneTap />
	<ModeWatcher disableTransitions={false} defaultMode={'dark'} />
	{@render children()}
</ClerkProvider>

<script lang="ts">
	import { ModeWatcher } from 'mode-watcher';
	import { setupConvex } from 'convex-svelte';
	import { createSvelteAuthClient } from '@mmailaender/convex-better-auth-svelte/svelte';
	import { authClient } from '$lib/auth-client';

	// Props
	let { children } = $props();

	// Setup Convex
	// Only setup Convex if the URL is provided
	if (process.env.PUBLIC_CONVEX_URL) {
		try {
			setupConvex(process.env.PUBLIC_CONVEX_URL);
			createSvelteAuthClient({ authClient });
		} catch (error) {
			console.warn('Failed to setup Convex:', error);
		}
	} else {
		console.log('Convex setup skipped: PUBLIC_CONVEX_URL not configured (likely dev build)');
	}
</script>

<ModeWatcher disableTransitions={false} defaultMode={'dark'} />
{@render children()}

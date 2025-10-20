<script lang="ts">
	import { authClient } from '$lib/auth-client';
	import { LoaderCircle } from '@lucide/svelte';
	import Button from '../ui/button/button.svelte';

	const { provider, children } = $props();

	let loading = $state(false);
</script>

<Button
	variant="outline"
	disabled={loading}
	onclick={() => {
		loading = true;
		authClient.signIn.social({
			provider: provider,
			callbackURL: process.env.PUBLIC_CONVEX_SITE_URL + '/auth?redirect=' + window.location.href
		});
	}}
>
	{#if loading}
		<LoaderCircle class="animate-spin" />
	{/if}
	{@render children()}
</Button>

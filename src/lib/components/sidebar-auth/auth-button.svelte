<script lang="ts">
	import { authClient } from '$lib/auth-client';
	import Button from '../ui/button/button.svelte';

	const { provider, children } = $props();
</script>

<Button
	onclick={() => {
		authClient.signIn.social({
			provider: provider,
			callbackURL: process.env.PUBLIC_CONVEX_SITE_URL + '/auth?redirect=' + window.location.href
		});
	}}
>
	{@render children()}
</Button>

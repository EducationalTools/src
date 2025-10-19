<script lang="ts">
	import { authClient } from '$lib/auth-client';
	import { LoaderCircle } from '@lucide/svelte';
	import { useConvexAuth } from 'convex/react';
	// import { onMount } from 'svelte';
	import { page } from '$app/state';
	import { onMount, untrack } from 'svelte';
	import { useAuth } from '@mmailaender/convex-better-auth-svelte/svelte';
	import { goto } from '$app/navigation';
	import { toast } from 'svelte-sonner';

	const auth = useAuth();

	function explicitEffect(fn: () => void, depsFn: () => any[]) {
		$effect(() => {
			depsFn();
			untrack(fn);
		});
	}

	explicitEffect(
		() => {
			if (!auth.isLoading) {
				if (auth.isAuthenticated) {
					goto(page.url.searchParams.get('redirect') || '/');
					toast.success('Logged in successfully!');
				}

				authClient.signIn
					.ott({
						token: page.url.searchParams.get('token') || ''
					})
					.then();
			}
		},
		() => [auth.isLoading]
	);
</script>

<div class="flex h-full w-full flex-row items-center justify-center gap-2 p-10">
	<LoaderCircle class="animate-spin" />
	Logging in...
</div>

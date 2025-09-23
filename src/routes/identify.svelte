<script lang="ts">
	import posthog from 'posthog-js';
	import { onMount } from 'svelte';
	onMount(() => {
		setTimeout(() => {
			if (posthog.get_distinct_id().startsWith('user_')) {
				posthog.reset();
			}
		}, 2000);
	});
	// $effect(() => {
	// if (userCtx.user && userCtx.user.emailAddresses?.length > 0) {
	// 	posthog.identify(userCtx.user.id, {
	// 		email: userCtx.user.emailAddresses[0].emailAddress,
	// 		name: userCtx.user.fullName,
	// 		clerkId: userCtx.user.id
	// 	});
	// }
	// });
</script>

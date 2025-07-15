<script lang="ts">
	import posthog from 'posthog-js';
	import { useClerkContext } from 'svelte-clerk/client';

	const userCtx = useClerkContext();

	$effect(() => {
		if (userCtx.user && userCtx.user.emailAddresses?.length > 0) {
			posthog.identify(userCtx.user.id, {
				email: userCtx.user.emailAddresses[0].emailAddress,
				name: userCtx.user.fullName,
				clerkId: userCtx.user.id
			});
		} else {
			posthog.reset();
		}
	});
</script>

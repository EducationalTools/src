<script lang="ts">
	import { onMount } from 'svelte';
	import {
		SignedIn,
		SignedOut,
		SignInButton,
		UserButton,
		useClerkContext,
		SignIn,
		SignUp,
		UserProfile
	} from 'svelte-clerk/client';
	const ctx = useClerkContext();

	let sessionToken = $state('');

	$effect(() => {
		ctx.session?.getToken().then((token) => {
			if (token) {
				sessionToken = token;
			}
		});
	});

	import { useQuery } from 'convex-svelte';
	import { api } from '$lib/../convex/_generated/api.js';

	let query = $state(useQuery(api.backups.get, { jwt: '' }));

	$effect(() => {
		query = useQuery(api.backups.get, { jwt: sessionToken });
	});
</script>

<!-- <SignedIn>{sessionToken}</SignedIn>
<SignedOut>You need account</SignedOut> -->

{query.data}

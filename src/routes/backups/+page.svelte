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

	import dayjs from 'dayjs';

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

<SignedIn>
	<div class="mx-auto grid w-full max-w-3xl grid-cols-1 gap-4 p-3 md:grid-cols-2">
		{#each query.data || [] as backup}
			<div>
				<h2>{backup.name}</h2>
				<p>Creation Time: {dayjs(backup.creationTime).format('HH:MM a  DD/MM/YY')}</p>
				<p></p>
			</div>
		{/each}
	</div>
</SignedIn>
<SignedOut>You need account</SignedOut>

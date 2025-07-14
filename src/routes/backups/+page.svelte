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
	import Button from '$lib/components/ui/button/button.svelte';
	import * as Card from '$lib/components/ui/card/index.js';
	import Input from '$lib/components/ui/input/input.svelte';
	import LoaderCircle from 'lucide-svelte/icons/loader-circle';

	let query = $state(useQuery(api.backups.get, { jwt: '' }));

	$effect(() => {
		query = useQuery(api.backups.get, { jwt: sessionToken });
	});
</script>

<SignedIn>
	<div class="mx-auto grid w-full max-w-3xl grid-cols-1 gap-4 p-3 md:grid-cols-2">
		<Card.Root>
			<Card.Header><Card.Title>Create a Backup</Card.Title></Card.Header>
			<Card.Footer class="flex flex-row gap-3">
				<Input placeholder="Backup Name" />
				<Button disabled={!query.data}>Create</Button>
			</Card.Footer>
		</Card.Root>
		{#if !query.data}
			<div class="flex items-center justify-center">
				<LoaderCircle class="animate-spin" />
			</div>
		{/if}
		{#each query.data || [] as backup}
			<Card.Root>
				<Card.Header>
					<Card.Title>{backup.name}</Card.Title>
					<Card.Description>
						{dayjs(backup.creationTime).format('HH:MM a  DD/MM/YY')}
					</Card.Description>
				</Card.Header>
				<Card.Footer class="flex flex-row gap-3">
					<Button>Restore</Button>
					<Button variant="destructive">Delete</Button>
				</Card.Footer>
			</Card.Root>
		{/each}
	</div>
</SignedIn>
<SignedOut>You need account</SignedOut>

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
		refreshToken();
	});

	import { useConvexClient, useQuery } from 'convex-svelte';
	import { api } from '$lib/../convex/_generated/api.js';
	import Button, { buttonVariants } from '$lib/components/ui/button/button.svelte';
	import * as Card from '$lib/components/ui/card/index.js';
	import Input from '$lib/components/ui/input/input.svelte';
	import LoaderCircle from 'lucide-svelte/icons/loader-circle';
	import * as AlertDialog from '$lib/components/ui/alert-dialog/index.js';
	import { toast } from 'svelte-sonner';
	import Backup from './backup.svelte';
	import createBackup from '$lib/createBackup';

	let query = $state(useQuery(api.backups.get, { jwt: '' }));
	const client = useConvexClient();
	let enteredBackupName = $state('');

	$effect(() => {
		query = useQuery(api.backups.get, { jwt: sessionToken });
	});

	async function refreshToken() {
		const token = await ctx.session?.getToken();
		if (token) {
			sessionToken = token;
		}
		return;
	}
</script>

<SignedIn>
	<div class="mx-auto grid w-full max-w-3xl grid-cols-1 gap-4 p-3 md:grid-cols-2">
		<Card.Root>
			<Card.Header><Card.Title>Create a Backup</Card.Title></Card.Header>
			<Card.Footer class="flex flex-row gap-3">
				<Input placeholder="Backup Name" bind:value={enteredBackupName} />
				<Button
					disabled={!sessionToken}
					onclick={() => {
						refreshToken().then(() => {
							if (enteredBackupName.length > 0) {
								client
									.mutation(api.backups.create, {
										name: enteredBackupName,
										jwt: sessionToken,
										data: createBackup()
									})
									.then(() => {
										enteredBackupName = '';
										toast.success('Backup created successfully');
									});
							}
						});
					}}>Create</Button
				>
			</Card.Footer>
		</Card.Root>
		{#if !query.data}
			<div class="flex items-center justify-center">
				<LoaderCircle class="animate-spin" />
			</div>
		{/if}
		{#each query.data || [] as backup}
			<Backup {backup} {client} {sessionToken} {refreshToken} />
		{/each}
	</div>
</SignedIn>
<SignedOut>You need account</SignedOut>

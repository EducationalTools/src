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
		getToken().then((token) => {
			sessionToken = token;
		});
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
	import restoreBackup from '$lib/restoreBackup';
	import Clipboard from '@lucide/svelte/icons/clipboard';

	let query = $state(useQuery(api.backups.get, { jwt: '' }));
	const client = useConvexClient();
	let enteredBackupName = $state('');
	let loading = $state(false);

	let backupData = $state('');
	let inputtedBackupData = $state('');

	onMount(() => {
		backupData = createBackup();
	});

	$effect(() => {
		query = useQuery(api.backups.get, { jwt: sessionToken });
	});

	async function getToken() {
		const token = await ctx.session?.getToken();
		if (!token) {
			if (ctx.session) {
				toast.error('Something went wrong');
			}
			return '';
		}
		return token;
	}

	function setLoading(value: boolean) {
		loading = value;
	}
</script>

<div class="mx-auto flex w-full max-w-3xl flex-col gap-3 p-3">
	<AlertDialog.Root open={loading}
		><AlertDialog.Content class="flex flex-row gap-3">
			<LoaderCircle class="animate-spin" />
			Loading
		</AlertDialog.Content>
	</AlertDialog.Root>

	<Card.Root>
		<Card.Header><Card.Title>Local backup</Card.Title></Card.Header>
		<Card.Content class="flex flex-col gap-3">
			Export
			<div class="flex flex-row gap-3">
				<Input disabled={true} value={backupData} />
				<Button
					size="icon"
					onclick={() => {
						navigator.clipboard
							.writeText(backupData)
							.then(() => {
								toast.success('Backup copied to clipboard');
							})
							.catch((error) => {
								toast.error('Failed to copy backup to clipboard');
							});
					}}><Clipboard /></Button
				>
			</div>
			Import
			<div class="flex flex-row gap-3">
				<Input bind:value={inputtedBackupData} />
				<Button
					onclick={() => {
						loading = true;
						restoreBackup(inputtedBackupData);
					}}>Import</Button
				>
			</div>
		</Card.Content>
	</Card.Root>

	<SignedIn>
		<div class="grid w-full grid-cols-1 gap-3 md:grid-cols-2">
			<Card.Root>
				<Card.Header><Card.Title>Create a Backup</Card.Title></Card.Header>
				<Card.Footer class="flex flex-row gap-3">
					<Input placeholder="Backup Name" bind:value={enteredBackupName} />
					<Button
						disabled={!sessionToken}
						onclick={() => {
							loading = true;
							getToken().then((token) => {
								if (enteredBackupName.length > 0) {
									client
										.mutation(api.backups.create, {
											name: enteredBackupName,
											jwt: token,
											data: createBackup()
										})
										.then(() => {
											enteredBackupName = '';
											toast.success('Backup created successfully');
											loading = false;
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
				<Backup {backup} {client} {getToken} {setLoading} />
			{/each}
		</div>
	</SignedIn>
	<SignedOut>You need account</SignedOut>
</div>

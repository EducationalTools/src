<script lang="ts">
	import { onMount } from 'svelte';

	import dayjs from 'dayjs';

	import { useConvexClient, useQuery } from 'convex-svelte';
	import { api } from '$lib/../convex/_generated/api.js';
	import Button, { buttonVariants } from '$lib/components/ui/button/button.svelte';
	import * as Card from '$lib/components/ui/card/index.js';
	import Input from '$lib/components/ui/input/input.svelte';
	import LoaderCircle from '@lucide/svelte/icons/loader-circle';
	import * as AlertDialog from '$lib/components/ui/alert-dialog/index.js';
	import { toast } from 'svelte-sonner';
	import Backup from './backup.svelte';
	import createBackup from '$lib/createBackup';
	import restoreBackup from '$lib/restoreBackup';
	import Clipboard from '@lucide/svelte/icons/clipboard';
	import Info from '@lucide/svelte/icons/info';
	import * as Alert from '$lib/components/ui/alert/index.js';
	import posthog from 'posthog-js';

	// let query = $state(useQuery(api.backups.get, { jwt: '' }));
	// const client = useConvexClient();
	// let enteredBackupName = $state('');
	let loading = $state(false);

	let backupData = $state('');
	let inputtedBackupData = $state('');

	onMount(() => {
		backupData = createBackup();
	});

	// $effect(() => {
	// 	query = useQuery(api.backups.get, { jwt: sessionToken });
	// });

	function setLoading(value: boolean) {
		loading = value;
	}
</script>

<div class="mx-auto flex w-full max-w-3xl flex-col gap-3 p-3">
	<h1 class="text-3xl">Backups</h1>
	<AlertDialog.Root open={loading}
		><AlertDialog.Content class="flex flex-row gap-3">
			<LoaderCircle class="animate-spin" />
			Loading
		</AlertDialog.Content>
	</AlertDialog.Root>

	<Card.Root>
		<Card.Header><Card.Title>Local Backup</Card.Title></Card.Header>
		<Card.Content class="flex flex-col gap-3">
			Export
			<div class="flex flex-row gap-3">
				<Input disabled={true} value={backupData} />
				<Button
					size="icon"
					onclick={() => {
						posthog.capture('backup', { type: 'copy', location: 'local' });
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
					disabled={inputtedBackupData.length === 0}
					onclick={() => {
						posthog.capture('backup', { type: 'import', location: 'local' });
						loading = true;
						restoreBackup(inputtedBackupData);
					}}>Import</Button
				>
			</div>
		</Card.Content>
	</Card.Root>

	<!-- <SignedIn>
		<div class="grid w-full grid-cols-1 gap-3 md:grid-cols-2">
			<Card.Root>
				<Card.Header><Card.Title>Create a Backup</Card.Title></Card.Header>
				<Card.Footer class="flex flex-row gap-3">
					<Input placeholder="Backup Name" bind:value={enteredBackupName} />
					<Button
						disabled={!sessionToken || enteredBackupName.length === 0}
						onclick={() => {
							posthog.capture('backup', { type: 'create', location: 'cloud' });
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
										})
										.catch((error) => {
											loading = false;
											toast.error('Failed to create backup');
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
	<SignedOut>
		<Alert.Root>
			<Info />
			<Alert.Title>Tip</Alert.Title><Alert.Description
				>Backup to the cloud with an EduTools account.</Alert.Description
			></Alert.Root
		>
	</SignedOut> -->
</div>

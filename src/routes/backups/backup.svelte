<script lang="ts">
	import Button, { buttonVariants } from '$lib/components/ui/button/button.svelte';
	import * as Card from '$lib/components/ui/card/index.js';
	import * as AlertDialog from '$lib/components/ui/alert-dialog/index.js';
	import dayjs from 'dayjs';
	import { api } from '$lib/../convex/_generated/api.js';
	import clsx from 'clsx';
	import { toast } from 'svelte-sonner';
	import type { ConvexClient } from 'convex/browser';
	import type { Id } from '../../convex/_generated/dataModel';
	import Trash from '@lucide/svelte/icons/Trash';
	import Clipboard from '@lucide/svelte/icons/clipboard';
	import History from '@lucide/svelte/icons/History';
	import restoreBackup from '$lib/restoreBackup';

	let {
		backup,
		client,
		getToken,
		setLoading
	}: {
		backup: {
			name: string;
			data: string;
			creationTime: number;
			id: Id<'backup'>;
		};
		client: ConvexClient;
		getToken: () => Promise<string>;
		setLoading: (value: boolean) => void;
	} = $props();

	let restoreDialogOpen = $state(false);
	let deleteDialogOpen = $state(false);
</script>

<Card.Root>
	<Card.Header>
		<Card.Title>{backup.name}</Card.Title>
		<Card.Description>
			{dayjs(backup.creationTime).format('HH:MMa  DD/MM/YY')}
		</Card.Description>
	</Card.Header>
	<Card.Footer class="flex flex-row gap-3">
		<Button
			variant="outline"
			size="icon"
			onclick={() => {
				navigator.clipboard
					.writeText(backup.data)
					.then(() => {
						toast.success('Backup copied to clipboard');
					})
					.catch((error) => {
						toast.error('Failed to copy backup to clipboard');
					});
			}}
		>
			<Clipboard />
		</Button>
		<AlertDialog.Root bind:open={restoreDialogOpen}>
			<AlertDialog.Trigger class={buttonVariants({ variant: 'default', size: 'icon' })}>
				<History />
			</AlertDialog.Trigger>
			<AlertDialog.Content
				><AlertDialog.Header>
					<AlertDialog.Title>Restore Backup?</AlertDialog.Title>
					<AlertDialog.Description>This will replace all your current data</AlertDialog.Description>
				</AlertDialog.Header>
				<AlertDialog.Footer>
					<AlertDialog.Cancel>Cancel</AlertDialog.Cancel>
					<AlertDialog.Action
						onclick={() => {
							restoreDialogOpen = false;
							setLoading(true);
							restoreBackup(backup.data);
						}}>Continue</AlertDialog.Action
					>
				</AlertDialog.Footer>
			</AlertDialog.Content>
		</AlertDialog.Root>
		<AlertDialog.Root bind:open={deleteDialogOpen}>
			<AlertDialog.Trigger class={buttonVariants({ variant: 'destructive', size: 'icon' })}>
				<Trash />
			</AlertDialog.Trigger>
			<AlertDialog.Content
				><AlertDialog.Header>
					<AlertDialog.Title>Delete Backup?</AlertDialog.Title>
					<AlertDialog.Description>This will delete the backup permanently</AlertDialog.Description>
				</AlertDialog.Header>
				<AlertDialog.Footer>
					<AlertDialog.Cancel>Cancel</AlertDialog.Cancel>
					<AlertDialog.Action
						class={buttonVariants({ variant: 'destructive' })}
						onclick={() => {
							setLoading(true);
							getToken().then((token) => {
								deleteDialogOpen = false;
								client.mutation(api.backups.remove, { id: backup.id, jwt: token }).then(() => {
									toast.success('Backup deleted successfully');
									setLoading(false);
								});
							});
						}}>Continue</AlertDialog.Action
					>
				</AlertDialog.Footer>
			</AlertDialog.Content>
		</AlertDialog.Root>
	</Card.Footer>
</Card.Root>

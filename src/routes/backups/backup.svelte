<script lang="ts">
	import Button, { buttonVariants } from '$lib/components/ui/button/button.svelte';
	import * as Card from '$lib/components/ui/card/index.js';
	import * as AlertDialog from '$lib/components/ui/alert-dialog/index.js';
	import dayjs from 'dayjs';
	import { api } from '$lib/../convex/_generated/api.js';

	let { backup, client, sessionToken } = $props();
</script>

<Card.Root>
	<Card.Header>
		<Card.Title>{backup.name}</Card.Title>
		<Card.Description>
			{dayjs(backup.creationTime).format('HH:MMa  DD/MM/YY')}
		</Card.Description>
	</Card.Header>
	<Card.Footer class="flex flex-row gap-3">
		<AlertDialog.Root>
			<AlertDialog.Trigger class={buttonVariants({ variant: 'default' })}>
				Restore
			</AlertDialog.Trigger>
			<AlertDialog.Content
				><AlertDialog.Header>
					<AlertDialog.Title>Restore Backup?</AlertDialog.Title>
					<AlertDialog.Description>This will replace all your current data</AlertDialog.Description>
				</AlertDialog.Header>
				<AlertDialog.Footer>
					<AlertDialog.Cancel>Cancel</AlertDialog.Cancel>
					<AlertDialog.Action>Continue</AlertDialog.Action>
				</AlertDialog.Footer>
			</AlertDialog.Content>
		</AlertDialog.Root>
		<AlertDialog.Root>
			<AlertDialog.Trigger class={buttonVariants({ variant: 'destructive' })}>
				Delete
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
							client.mutation(api.backups.remove, { id: backup.id, jwt: sessionToken });
						}}>Continue</AlertDialog.Action
					>
				</AlertDialog.Footer>
			</AlertDialog.Content>
		</AlertDialog.Root>
	</Card.Footer>
</Card.Root>
